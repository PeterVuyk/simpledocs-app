import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';

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
        sqlTransaction.executeSql('drop table if exists articles;');
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

function describeTable(tableName: string): Promise<void> {
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
            console.log(`_array for ${tableName}: ${JSON.stringify(_array)}`);
          },
        );
      },
      () => {
        logger.error('errorCallback', tableName);
        reject();
      },
      () => {
        console.log('successCallback', tableName);
        resolve();
      },
    );
  });
}

async function describeTables(): Promise<void> {
  await describeTable('articles')
    .then(() => describeTable('notification'))
    .then(() => describeTable('versioning'))
    .then(() => describeTable('calculations'))
    .then(() => describeTable('decisionTrees'))
    .then(() => describeTable('migrationChangelog'));
}

const debugRepository = {
  resetDatabase,
  describeTables,
};

export default debugRepository;
