import * as SQLite from 'expo-sqlite';
import master from './master';
import { Migration } from './Migration';
import migrationChangelogRepository from '../repository/migrationChangelogRepository';
import { MigrationChangelog } from '../../model/migrationChangelog';
import logger from '../../helper/logger';

const db = SQLite.openDatabase('db.db');

export default class SQLiteClient {
  private readonly migrations: Migration[];

  constructor() {
    this.migrations = master;
  }

  public async runMigrations(
    migrationChangelog: MigrationChangelog[],
  ): Promise<void> {
    // eslint-disable-next-line no-restricted-syntax
    for (const migration of this.migrations) {
      if (
        migrationChangelog.find(value => value.filename === migration.getId())
      ) {
        continue;
      }
      try {
        // eslint-disable-next-line no-await-in-loop
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
