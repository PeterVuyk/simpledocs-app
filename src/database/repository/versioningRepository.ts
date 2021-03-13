import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export interface Versioning {
  aggregate: string;
  version: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function getVersioning(aggregate: string): Versioning | null {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM versioning WHERE aggregate = ? LIMIT 1;`,
        [aggregate],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          if (_array.length === 1) {
            return _array[0];
          }
          return null;
        },
      );
    },
    error => console.error('getVersioning failed: ', error),
  );
  return null;
}

const versioningRepository = {
  getVersioning,
};

export default versioningRepository;
