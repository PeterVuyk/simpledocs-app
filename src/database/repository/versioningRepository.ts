import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';
import { Versioning } from '../../model/Versioning';

const db = SQLite.openDatabase('db.db');

function updateVersioningWithTransaction(
  sqlTransaction: SQLite.SQLTransaction,
  aggregate: string,
  version: string,
): void {
  sqlTransaction.executeSql(
    `UPDATE versioning SET version = ? WHERE aggregate = ?`,
    [version, aggregate],
  );
}

function updateVersioning(aggregate: string, version: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          `UPDATE versioning SET version = ? WHERE aggregate = ?;`,
          [version, aggregate],
        );
      },
      error => {
        logger.error(
          'versioningRepository.updateVersioning failed',
          error.message,
        );
        reject();
      },
      resolve,
    );
  });
}

async function getVersioning(
  aggregate: string,
  callback: (versioning: Versioning) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          `SELECT *
           FROM versioning
           WHERE aggregate = ?
           LIMIT 1;`,
          [aggregate],
          // @ts-ignore
          (_, { rows: { _array } }) => {
            if (_array.length === 1) {
              callback(_array[0] as Versioning);
            }
          },
        );
      },
      error => {
        logger.error(
          'versioningRepository.getVersioning failed',
          error.message,
        );
        reject();
      },
      resolve,
    );
  });
}

function getAllVersions(
  callback: (versioning: Versioning[]) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          `SELECT *
           FROM versioning`,
          [],
          // @ts-ignore
          (_, { rows: { _array } }) => {
            callback(_array as Versioning[]);
          },
        );
      },
      error => {
        logger.error(
          'versioningRepository.getVersioning failed',
          error.message,
        );
        reject();
      },
      resolve,
    );
  });
}

function removeVersion(versioning: Versioning): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          `DELETE FROM versioning WHERE aggregate = ?`,
          [versioning.aggregate],
        );
      },
      error => {
        logger.error(
          'removeVersion from versioning table has failed, rolled back',
          error.message,
        );
        reject();
      },
      resolve,
    );
  });
}

const versioningRepository = {
  getVersioning,
  getAllVersions,
  updateVersioningWithTransaction,
  updateVersioning,
  removeVersion,
};

export default versioningRepository;
