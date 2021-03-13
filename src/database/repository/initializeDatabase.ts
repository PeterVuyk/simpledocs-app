import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

function initialize(): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        'create table if not exists versioning (aggregate varchar not null, version varchar not null);',
      );
      sqlTransaction.executeSql(
        'create table if not exists regulation (chapter varchar not null constraint regulation_pk primary key, page_index int not null, title varchar not null, sub_title varchar, body text not null, search_text text not null, level varchar not null, icon varchar);',
      );
      sqlTransaction.executeSql(
        'CREATE UNIQUE INDEX IF NOT EXISTS versioning_aggregate_uindex ON versioning (aggregate);',
      );
      sqlTransaction.executeSql(
        "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES ('regulations', '2021.1.0');",
      );
    },
    error =>
      console.error(
        'initialization database has failed, rolled back, error: ',
        error,
      ),
  );
}

const initializeDatabase = {
  initialize,
};

export default initializeDatabase;
