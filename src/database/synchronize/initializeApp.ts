import * as SQLite from 'expo-sqlite';
import { SQLTransaction } from 'expo-sqlite';
import logger from '../../util/logger';
import migrations from '../migrations/migrations';
import migrationChangelogRepository from '../repository/migrationChangelogRepository';

const db = SQLite.openDatabase('db.db');

function addMigrationsChangelog(sqlTransaction: SQLTransaction): void {
  migrations.forEach(migration =>
    migrationChangelogRepository.updateMigrationChangelog(
      sqlTransaction,
      migration.getId(),
    ),
  );
}

function initializeChangelogTable(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          'create table if not exists migrationChangelog (id integer not null constraint migrations_pk primary key autoincrement, filename varchar not null, dateExecuted datetime default current_timestamp);',
        );
      },
      error => {
        logger.error(
          'initializeChangelogTable has failed, rolled back',
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
          'create table if not exists notification (id integer not null constraint notification_pk primary key autoincrement, notificationType varchar not null, notificationEnabled integer default 1 not null)',
        );
        sqlTransaction.executeSql(
          'create table if not exists articles (id integer not null constraint articles_pk primary key autoincrement, chapter varchar not null, pageIndex integer not null, title text not null, bookType text not null, subTitle text, content blob not null, contentType varchar not null, searchText text not null, level varchar not null, iconFile blob);',
        );
        sqlTransaction.executeSql(
          'create table if not exists calculations (calculationType text not null constraint calculations_pk primary key, listIndex integer not null, title text not null, explanation text not null, content blob not null, contentType varchar not null, iconFile blob not null);',
        );
        sqlTransaction.executeSql(
          'create table if not exists decisionTrees (id int not null, title text, label text not null, lineLabel varchar, parentId int, content blob, contentType varchar, iconFile blob);',
        );
        sqlTransaction.executeSql(
          "INSERT or ignore INTO notification (notificationType) VALUES ('noInternetConnection');",
        );
        sqlTransaction.executeSql(
          "INSERT or ignore INTO notification (notificationType) VALUES ('horizontalScrollTip');",
        );
        addMigrationsChangelog(sqlTransaction);
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

const initializeApp = {
  initializeInitialTables,
  initializeChangelogTable,
};

export default initializeApp;
