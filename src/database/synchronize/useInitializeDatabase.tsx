import { useCallback, useEffect, useState } from 'react';
import migrationChangelogRepository from '../repository/migrationChangelogRepository';
import { MigrationChangelog } from '../../model/migrationChangelog';
import initializeApp from '../synchronize/initializeApp';
import logger from '../../util/logger';
import SQLiteClient from '../migrations/SQLiteClient';

function useInitializeDatabase() {
  const [migrations, setMigrations] = useState<MigrationChangelog[] | null>(
    null,
  );
  const [startInitializing, setStartInitializing] = useState<boolean>(false);
  const [
    initializationDatabaseSuccessful,
    setInitializationDatabaseSuccessful,
  ] = useState<boolean | null>();

  useEffect(() => {
    async function init() {
      // First we make sure the initial migration table exists
      await initializeApp
        .initializeChangelogTable()
        .then(() =>
          // Then we get all migrations that are already migrated
          migrationChangelogRepository.getMigrationChangelog(setMigrations),
        )
        // If the initialization failed or getting the migrations, then something really went wrong and we return the initialization failure.
        .catch(reason => {
          logger.error('Failed to initialize database', reason);
          setInitializationDatabaseSuccessful(false);
        });
    }
    init();
  }, []);

  const initializeDatabase = useCallback(async () => {
    setStartInitializing(true);
  }, []);

  useEffect(() => {
    async function runMigrations() {
      if (!startInitializing || migrations === null) {
        return;
      }

      // If no migrations are executed yet, then we initialize all tables instead of running the migrations to speedup the first startup
      if (migrations.length === 0) {
        await initializeApp.initializeInitialTables().catch(reason => {
          logger.error('Failed first startup of the app', reason);
          setInitializationDatabaseSuccessful(false);
        });
        setInitializationDatabaseSuccessful(true);
        return;
      }

      // Now we run all migrations
      new SQLiteClient()
        .runMigrations(migrations)
        // If an error occurs with the migrations, something really went wrong and app is not usable
        .catch(reason => {
          logger.error('Failed running the migrations by startup', reason);
          setInitializationDatabaseSuccessful(false);
        })
        // if migrations are successful
        .then(() => setInitializationDatabaseSuccessful(true));
    }
    runMigrations();
  }, [migrations, startInitializing]);

  return { initializeDatabase, initializationDatabaseSuccessful };
}

export default useInitializeDatabase;
