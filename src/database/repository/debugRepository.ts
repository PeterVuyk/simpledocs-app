import * as SQLite from 'expo-sqlite';
import logger from '../../util/logger';
import {
  BOOK_PAGES,
  CALCULATIONS,
  DECISION_TREE,
  MIGRATION_CHANGELOG,
  NOTIFICATION,
} from '../tableNames';

/**
 * Unfortunately it is not possible to access the database with expo.
 * For this reason we created a debugRepository with helpful functions.
 * Only use it for debug purposes!
 */

const db = SQLite.openDatabase('db.db');

function resetDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql('drop table if exists versioning;');
        sqlTransaction.executeSql(
          'drop index if exists versioning_aggregate_uindex;',
        );
        sqlTransaction.executeSql('drop table if exists notification;');
        sqlTransaction.executeSql('drop table if exists bookPages;');
        sqlTransaction.executeSql('drop table if exists calculations;');
        sqlTransaction.executeSql('drop table if exists decisionTrees;');
        sqlTransaction.executeSql('drop table if exists migrationChangelog;');
      },
      error => {
        logger.error(
          'adding initial database for first startup has failed, rolled back',
          error.message,
        );
        reject();
      },
      resolve,
    );
  });
}

function describeTable(
  tableName: string,
  callback: (tableName: string, data: JSON[]) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          `SELECT sql
           FROM sqlite_master
           WHERE name = ?;`,
          [tableName],
          // @ts-ignore
          (_, { rows: { _array } }) => {
            callback(tableName, _array);
          },
        );
      },
      () => {
        reject();
      },
      () => {
        resolve();
      },
    );
  });
}

async function describeTables(
  callback: (tableName: string, data: JSON[]) => void,
): Promise<void> {
  await describeTable(BOOK_PAGES, callback)
    .then(() => describeTable(NOTIFICATION, callback))
    .then(() => describeTable(CALCULATIONS, callback))
    .then(() => describeTable(DECISION_TREE, callback))
    .then(() => describeTable(MIGRATION_CHANGELOG, callback));
}

const debugRepository = {
  resetDatabase,
  describeTables,
};

export default debugRepository;
