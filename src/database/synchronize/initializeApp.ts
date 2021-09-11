import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';
import collectConfig from '../firebase/collectConfig';
import { ConfigInfo } from '../../model/ConfigInfo';
import appConfigDAO from '../../fileSystem/appConfigDAO';

const db = SQLite.openDatabase('db.db');

/**
 * If you add more rows to the 'versioning-table', then make sure you
 * update the minimum number of expected versions in the AppSplashScreen.
 */
function initializeInitialBookTypes(configInfo: ConfigInfo): Promise<void> {
  const bookTypes = [
    ...configInfo.firstTab.bookTypes,
    ...configInfo.secondTab.bookTypes,
  ];
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        bookTypes.forEach(bookType => {
          sqlTransaction.executeSql(
            "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES (?, 'initial');",
            [bookType.bookType],
          );
        });
      },
      error => {
        logger.error(
          'initialization database with initial versions for bookTypes has failed, rolled back',
          error.message,
        );
        reject();
      },
      resolve,
    );
  });
}
function initializeInitialTables(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          'create table if not exists migrationChangelog (id integer not null constraint migrations_pk primary key autoincrement, filename varchar not null, dateExecuted datetime default current_timestamp);',
        );
        sqlTransaction.executeSql(
          'create table if not exists versioning (aggregate varchar not null, version varchar not null);',
        );
        sqlTransaction.executeSql(
          'CREATE UNIQUE INDEX if not exists versioning_aggregate_uindex ON versioning (aggregate);',
        );
        sqlTransaction.executeSql(
          'create table if not exists notification (id integer not null constraint notification_pk primary key autoincrement, notificationType varchar not null, notificationEnabled integer default 1 not null)',
        );
        sqlTransaction.executeSql(
          'create table if not exists articles (id integer not null constraint articles_pk primary key autoincrement, chapter varchar not null, pageIndex integer not null, title text not null, bookType text not null, subTitle text, content blob not null, contentType varchar not null, searchText text not null, level varchar not null, iconFile blob);',
        );
        sqlTransaction.executeSql(
          'create table if not exists calculations (calculationType text not null constraint calculations_pk primary key, listIndex integer not null, title text not null, explanation text not null, articleButtonText varchar not null, calculationImage blob not null, content blob not null, contentType varchar not null, iconFile blob not null);',
        );
        sqlTransaction.executeSql(
          'create table if not exists decisionTree (id int not null, title text, label text not null, lineLabel varchar, parentId int, content blob, contentType varchar, iconFile blob);',
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO notification (notificationType) VALUES ('noInternetConnection');",
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES ('decisionTree', 'initial');",
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES ('configurations', 'initial');",
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

async function initialize(): Promise<void> {
  /**
   * If the config does not exist in file storage, then the app is just installed and we initialize the migrations table.
   */
  if (await appConfigDAO.appConfigExistsInFileStorage()) {
    return;
  }
  await initializeInitialTables()
    .then(collectConfig.getConfig)
    .then(appConfig => {
      if (!appConfig) {
        throw Error(
          'Failed to collect ConfigInfo, initialization for migration failed',
        );
      }
      appConfigDAO.saveAppConfigToFileStorage(appConfig);
      return appConfig;
    })
    .then(initializeInitialBookTypes);
}

const initializeApp = {
  initialize,
};

export default initializeApp;
