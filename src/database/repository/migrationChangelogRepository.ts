import * as SQLite from 'expo-sqlite';
import { SQLTransaction } from 'expo-sqlite';
import { MigrationChangelog } from '../../model/migrationChangelog';

const db = SQLite.openDatabase('db.db');

function getMigrationChangelog(
  callback: (changelog: MigrationChangelog[]) => void,
): Promise<MigrationChangelog[]> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          `SELECT * FROM migrationChangelog;`,
          [],
          // @ts-ignore
          (_, { rows: { _array } }) => {
            callback(_array);
          },
        );
      },
      reject,
      resolve,
    );
  });
}

function updateMigrationChangelog(
  sqlTransaction: SQLTransaction,
  filename: string,
): void {
  sqlTransaction.executeSql(
    'INSERT INTO migrationChangelog (filename) VALUES (?)',
    [filename],
  );
}

const migrationChangelogRepository = {
  getMigrationChangelog,
  updateMigrationChangelog,
};

export default migrationChangelogRepository;
