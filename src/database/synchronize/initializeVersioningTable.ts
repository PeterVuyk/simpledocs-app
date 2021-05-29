import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';

const db = SQLite.openDatabase('db.db');

function initialize(): Promise<any> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          'create table if not exists versioning (aggregate varchar not null, version varchar not null);',
        );
        sqlTransaction.executeSql(
          'CREATE UNIQUE INDEX IF NOT EXISTS versioning_aggregate_uindex ON versioning (aggregate);',
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES ('regulations', 'initial');",
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES ('decisionTree', 'initial');",
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES ('calculations', 'initial');",
        );
      },
      error => {
        logger.error(
          'initialization database with versions table has failed, rolled back',
          error.message,
        );
        reject();
      },
      resolve,
    );
  });
}
const initializeVersioningTable = {
  initialize,
};

export default initializeVersioningTable;
