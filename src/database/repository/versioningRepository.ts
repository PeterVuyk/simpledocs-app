import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export interface Versioning {
  aggregate: string;
  version: string;
}

function updateVersioning(
  sqlTransaction: SQLite.SQLTransaction,
  aggregate: string,
  version: string,
): void {
  sqlTransaction.executeSql(
    `UPDATE versioning SET version = ? WHERE aggregate = ?`,
    [version, aggregate],
  );
}

// eslint-disable-next-line @typescript-eslint/ban-types
async function getVersioning(
  aggregate: string,
  callback: (versioning: Versioning) => void,
): Promise<void> {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT *
         FROM versioning
         WHERE aggregate = ?
         LIMIT 1;`,
        [aggregate],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          if (_array.length === 1) {
            callback(_array[0] as Versioning);
          }
        },
      );
    },
    error => console.error('getVersioning failed: ', error),
  );
}

const versioningRepository = {
  getVersioning,
  updateVersioning,
};

export default versioningRepository;
