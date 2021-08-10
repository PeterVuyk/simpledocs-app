import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';
import collectConfig from '../firebase/collectConfig';
import { BookInfo } from '../../model/ConfigInfo';
import appConfigDAO from '../../fileSystem/appConfigDAO';

const db = SQLite.openDatabase('db.db');

async function initializeAndGetBookTypes(): Promise<BookInfo[]> {
  let appConfig;
  if (await appConfigDAO.appConfigExistsInFileStorage()) {
    appConfig = await appConfigDAO.getAppConfig();
  } else {
    appConfig = await collectConfig.getConfig();
    if (appConfig) {
      await appConfigDAO
        .saveAppConfigToFileStorage(appConfig)
        .catch(reason =>
          logger.error(
            'Save appConfig to fileStorage failed by initialization app first use',
            reason,
          ),
        );
    }
  }
  if (!appConfig) {
    return [];
  }
  return [...appConfig.firstTab.bookTypes, ...appConfig.secondTab.bookTypes];
}

/**
 * If you add more rows to the 'versioning-table', then make sure you
 * update the minimum number of expected versions in the AppSplashScreen.
 */
function initialize(): Promise<any> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          'create table if not exists articles (id integer not null constraint articles_pk primary key autoincrement, chapter varchar not null, pageIndex integer not null, title text not null, bookType text not null, subTitle text, htmlFile blob not null, searchText text not null, level varchar not null, iconFile blob);',
        );
        sqlTransaction.executeSql(
          'create table if not exists notifications (notificationType varchar not null, notificationEnabled NUMERIC default 1 not null);',
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO notifications (notificationType, notificationEnabled) VALUES ('noInternetConnection', 1);",
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO notifications (notificationType, notificationEnabled) VALUES ('horizontalScrollTip', 1);",
        );
        sqlTransaction.executeSql(
          'CREATE UNIQUE INDEX IF NOT EXISTS notifications_uindex ON notifications (notificationType);',
        );
        sqlTransaction.executeSql(
          'create table if not exists versioning (aggregate varchar not null, version varchar not null);',
        );
        sqlTransaction.executeSql(
          'CREATE UNIQUE INDEX IF NOT EXISTS versioning_aggregate_uindex ON versioning (aggregate);',
        );
        initializeAndGetBookTypes()
          .then(bookTypes => {
            bookTypes.forEach(bookType => {
              sqlTransaction.executeSql(
                "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES (?, 'initial');",
                [bookType],
              );
            });
          })
          .catch(reason =>
            logger.error(
              'Failed collecting articles from config file to save in versioning table',
              reason,
            ),
          );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES ('decisionTree', 'initial');",
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES ('appConfig', 'initial');",
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES ('calculations', 'initial');",
        );
      },
      error => {
        logger.error(
          'initialization database with versions and notifications table has failed, rolled back',
          error.message,
        );
        reject();
      },
      resolve,
    );
  });
}

const initializeTables = {
  initialize,
};

export default initializeTables;
