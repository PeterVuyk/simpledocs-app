import React from 'react';
import synchronizeDatabase from './synchronizeDatabase';
import {
  AGGREGATE_CALCULATIONS,
  AGGREGATE_DECISION_TREE,
} from '../../../model/aggregate';
import logger from '../../../util/logger';
import configurationsDAO from '../../../configurations/configurationsDAO';
import environment from '../../../util/environment';
import configHelper from '../../../helper/configHelper';
import { STAGING_ENVIRONMENT } from '../../../model/Environment';
import debugHandler from '../../../debug/debugHandler';
import getAppInfo from '../../../firebase/functions/getAppInfo';
import configurationsStorage from '../../../configurations/configurationsStorage';
import { AppInfo } from '../../../model/AppInfoResponse';
import { AppConfigurations } from '../../../model/AppConfigurations';
import articleRepository from '../../repository/articleRepository';
import { ApiArticle, Article } from '../../../model/Article';

function useUpdateAggregates() {
  const addBookmarksToArticles = (
    bookType: string,
    articles: ApiArticle[],
    bookmarkedArticles: Article[],
  ) => {
    bookmarkedArticles
      .filter(value => value.bookType === bookType)
      .forEach(bookmarkedArticle => {
        const article = articles.find(
          value => value.chapter === bookmarkedArticle.chapter,
        );
        if (article) {
          article.bookmarked = bookmarkedArticle.bookmarked;
        }
      });
    return articles;
  };

  const updateBooksOld = async (
    appInfoResponse: AppInfo,
    bookmarkedArticles: Article[],
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
          bookmarkedArticles,
        ),
      );
    }
  };

  const updateBooksPreserveFavorites = async (
    appInfoResponse: AppInfo,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      articleRepository
        .getBookmarkedChapters(async articles => {
          await updateBooksOld(appInfoResponse, articles);
          resolve();
        })
        .catch(reason => {
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

  const updateAggregates = async () => {
    const appInfo = await getAppInfoFromServer();
    if (!appInfo || !('appConfigurations' in appInfo)) {
      return;
    }

    await configurationsDAO.updateConfigurations(appInfo.appConfigurations);
    await updateDecisionTree(appInfo)
      .then(() => updateCalculations(appInfo))
      .then(() => updateBooksPreserveFavorites(appInfo))
      .then(configurationsDAO.createSessionConfiguration)
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
