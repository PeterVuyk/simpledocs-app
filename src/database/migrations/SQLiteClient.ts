import * as SQLite from 'expo-sqlite';
import migrations from './migrations';
import { Migration } from './Migration';
import migrationChangelogRepository from '../repository/migrationChangelogRepository';
import { MigrationChangelog } from '../../model/migrationChangelog';
import logger from '../../util/logger';

const db = SQLite.openDatabase('db.db');

export default class SQLiteClient {
  private readonly migrations: Migration[];

  constructor() {
    this.migrations = migrations.sort((a, b) =>
      a.getId().localeCompare(b.getId()),
    );
  }

  public async runMigrations(
    migrationChangelog: MigrationChangelog[],
  ): Promise<void> {
    for (const migration of this.migrations) {
      if (
        migrationChangelog.find(value => value.filename === migration.getId())
      ) {
        continue;
      }
      try {
        await this.migrate(migration);
      } catch (e) {
        logger.error(
          `Migrations aborted because an error has occurred for migration: ${migration.getId()} from list migrations: ${this.migrations
            .map(value => value.getId())
            .concat(
              ', ',
            )}. Migrations already migrated: ${migrationChangelog.map(
            log => `filename: ${log.filename}, executed: ${log.dateExecuted}`,
          )}`,
          e,
        );
      }
    }
  }

  private async migrate(migration: Migration): Promise<void> {
    return new Promise((resolve, reject) => {
      db.transaction(
        sqlTransaction => {
          migration.up(sqlTransaction);
          migrationChangelogRepository.updateMigrationChangelog(
            sqlTransaction,
            migration.getId(),
          );
        },
        error => {
          logger.error(
            `Migration for ${migration.getId()} failed, migrating aborted`,
            error.message,
          );
          reject();
        },
        resolve,
      );
    });
  }
}
