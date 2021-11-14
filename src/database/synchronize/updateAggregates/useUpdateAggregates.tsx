import React from 'react';
import synchronizeDatabase from './synchronizeDatabase';
import {
  AGGREGATE_CALCULATIONS,
  AGGREGATE_DECISION_TREE,
} from '../../../model/aggregate';
import logger from '../../../util/logger';
import configurationsHelper from '../../../helper/configurationsHelper';
import environment from '../../../util/environment';
import configHelper from '../../../helper/configHelper';
import { STAGING_ENVIRONMENT } from '../../../model/Environment';
import debugHandler from '../../../debug/debugHandler';
import getAppInfo from '../../../firebase/functions/getAppInfo';
import configurationsStorage from '../../../storage/configurationsStorage';
import { AppInfo } from '../../../model/AppInfoResponse';
import { AppConfigurations } from '../../../model/AppConfigurations';
import articleRepository from '../../repository/articleRepository';
import { ApiArticle } from '../../../model/Article';
import { Bookmark } from '../../../model/Bookmark';

function useUpdateAggregates() {
  const addBookmarksToArticles = (
    bookType: string,
    articles: ApiArticle[],
    bookmarks: Bookmark[],
  ) => {
    bookmarks
      .filter(value => value.bookType === bookType)
      .forEach(bookmarkedArticle => {
        const article = articles.find(
          value => value.chapter === bookmarkedArticle.chapter,
        );
        if (article) {
          article.bookmarked = true;
        }
      });
    return articles;
  };

  const updateBooks = async (
    appInfoResponse: AppInfo,
    bookmarks: Bookmark[],
  ): Promise<void> => {
    const appConfigurations =
      appInfoResponse.appConfigurations as AppConfigurations;

    const books = [
      ...appConfigurations!.firstTab.bookTypes.map(value => value.bookType),
      ...appConfigurations!.secondTab.bookTypes.map(value => value.bookType),
    ];
    for (const aggregate in appConfigurations!.versioning) {
      if (!appConfigurations!.versioning[aggregate].isBookType) {
        continue;
      }
      if (!books.includes(aggregate)) {
        continue;
      }
      if (appInfoResponse[aggregate] === undefined) {
        continue;
      }
      await synchronizeDatabase.updateBook(
        aggregate,
        appInfoResponse.appConfigurations.versioning[aggregate].version,
        addBookmarksToArticles(
          aggregate,
          appInfoResponse[aggregate],
          bookmarks,
        ),
      );
    }
  };

  const updateBooksPreserveFavorites = async (
    appInfoResponse: AppInfo,
    preservedBookmarks: Bookmark[],
  ): Promise<void> => {
    if (preservedBookmarks.length !== 0) {
      return updateBooks(appInfoResponse, preservedBookmarks);
    }
    return new Promise((resolve, reject) => {
      articleRepository
        .getBookmarkedChapters(async articles => {
          await updateBooks(
            appInfoResponse,
            articles.map(value => {
              return { chapter: value.chapter, bookType: value.bookType };
            }),
          );
          resolve();
        })
        .catch(reason => {
          logger.error('failed collecting bookmarks from database', reason);
          reject(reason);
        });
    });
  };

  const updateCalculations = async (
    appInfoResponse: AppInfo,
  ): Promise<void> => {
    if (
      AGGREGATE_CALCULATIONS in appInfoResponse &&
      appInfoResponse[AGGREGATE_CALCULATIONS] !== undefined
    ) {
      await synchronizeDatabase.updateCalculations(
        appInfoResponse.appConfigurations.versioning[AGGREGATE_CALCULATIONS]
          .version,
        appInfoResponse[AGGREGATE_CALCULATIONS],
      );
    }
  };

  const updateDecisionTree = async (
    appInfoResponse: AppInfo,
  ): Promise<void> => {
    if (
      AGGREGATE_DECISION_TREE in appInfoResponse &&
      appInfoResponse[AGGREGATE_DECISION_TREE] !== undefined
    ) {
      await synchronizeDatabase.updateDecisionTree(
        appInfoResponse.appConfigurations.versioning[AGGREGATE_DECISION_TREE]
          .version,
        appInfoResponse[AGGREGATE_DECISION_TREE],
      );
    }
  };

  const getAppInfoFromServer = async () => {
    let versions = await configurationsStorage
      .getSystemConfiguration()
      .then(value => value?.versions);

    if (
      versions !== undefined &&
      environment.getEnvironment().envName === STAGING_ENVIRONMENT
    ) {
      versions = configHelper.overWriteVersions(versions);
    }

    return getAppInfo(versions).catch(reason =>
      logger.error(
        'Tried to get appConfigurations from the server api but failed, updateAggregates skipped',
        reason,
      ),
    );
  };

  const updateAggregates = async (preservedBookmarks: Bookmark[]) => {
    const appInfo = await getAppInfoFromServer();
    if (!appInfo || !('appConfigurations' in appInfo)) {
      return;
    }

    await configurationsHelper.updateConfigurations(appInfo.appConfigurations);
    await updateDecisionTree(appInfo)
      .then(() => updateCalculations(appInfo))
      .then(() => updateBooksPreserveFavorites(appInfo, preservedBookmarks))
      .then(configurationsHelper.createSessionConfiguration)
      .catch(reason => {
        logger.error(
          'something when wrong by update aggregates, some or all updates may be skipped',
          reason,
        );
        debugHandler.dumpConfigToStorage();
      });
  };
  return { updateAggregates };
}

export default useUpdateAggregates;
