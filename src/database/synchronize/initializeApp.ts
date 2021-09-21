import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';
import { ConfigInfo } from '../../model/ConfigInfo';

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

const initializeApp = {
  initializeInitialBookTypes,
  initializeInitialTables,
};

export default initializeApp;
