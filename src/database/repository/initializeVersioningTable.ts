import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

function initialize(): void {
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
    },
    error =>
      console.error(
        'initialization database has failed, rolled back, error: ',
        error,
      ),
  );
}

const initializeVersioningTable = {
  initialize,
};

export default initializeVersioningTable;
