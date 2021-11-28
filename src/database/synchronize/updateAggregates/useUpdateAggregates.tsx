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
import { AppConfigurations } from '../../../model/configurations/AppConfigurations';
import bookPagesRepository from '../../repository/bookPagesRepository';
import { ApiBookPage } from '../../../model/bookPages/BookPage';
import { Bookmark } from '../../../model/bookPages/Bookmark';

function useUpdateAggregates() {
  const addBookmarksToPages = (
    bookType: string,
    apiBookPages: ApiBookPage[],
    bookmarks: Bookmark[],
  ) => {
    bookmarks
      .filter(value => value.bookType === bookType)
      .forEach(bookmarkedPage => {
        const page = apiBookPages.find(value => value.id === bookmarkedPage.id);
        if (page) {
          page.bookmarked = true;
        }
      });
    return apiBookPages;
  };

  const updateBooks = async (
    appInfoResponse: AppInfo,
    bookmarks: Bookmark[],
  ): Promise<void> => {
    const appConfigurations =
      appInfoResponse.appConfigurations as AppConfigurations;

    const books = [
      ...appConfigurations!.firstBookTab.bookTypes.map(value => value.bookType),
      ...appConfigurations!.secondBookTab.bookTypes.map(
        value => value.bookType,
      ),
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
        addBookmarksToPages(aggregate, appInfoResponse[aggregate], bookmarks),
      );
    }
  };

  const updateBooksPreserveBookmarks = async (
    appInfoResponse: AppInfo,
    preservedBookmarks: Bookmark[],
  ): Promise<void> => {
    if (preservedBookmarks.length !== 0) {
      return updateBooks(appInfoResponse, preservedBookmarks);
    }
    return new Promise((resolve, reject) => {
      bookPagesRepository
        .getBookmarkedPages(async pages => {
          await updateBooks(
            appInfoResponse,
            pages.map(value => {
              return { id: value.id, bookType: value.bookType };
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
      .then(() => updateBooksPreserveBookmarks(appInfo, preservedBookmarks))
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
