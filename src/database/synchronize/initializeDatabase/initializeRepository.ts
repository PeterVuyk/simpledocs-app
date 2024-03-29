import * as SQLite from 'expo-sqlite';
import { SQLTransaction } from 'expo-sqlite';
import logger from '../../../util/logger';
import migrations from '../../migrations/migrations';
import migrationChangelogRepository from '../../repository/migrationChangelogRepository';

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
          'create table if not exists bookPages (id varchar not null constraint bookPages_pk primary key, chapter varchar not null, pageIndex integer not null, title text not null, bookType text not null, subTitle text, content blob not null, contentType varchar not null, searchText text not null, chapterDivision varchar not null, iconFile blob, bookmarked integer default 0 not null);',
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

const initializeRepository = {
  initializeInitialTables,
  initializeChangelogTable,
};

export default initializeRepository;
