import { useCallback, useEffect, useState } from 'react';
import migrationChangelogRepository from '../repository/migrationChangelogRepository';
import { MigrationChangelog } from '../../model/migrationChangelog';
import initializeApp from '../synchronize/initializeApp';
import logger from '../../helper/logger';
import SQLiteClient from '../migrations/SQLiteClient';
import collectConfig from '../firebase/collectConfig';
import appConfigDAO from '../../fileSystem/appConfigDAO';

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
        .initializeInitialTables()
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
    if (!startInitializing || migrations === null) {
      return;
    }

    // If no migrations are executed yet, then this was the first startup
    if (migrations.length === 0) {
      // we get the configurations file from firebase and save it to the fileStorage
      collectConfig
        .getConfig()
        .then(async appConfig => {
          if (!appConfig) {
            throw Error(
              'Failed to collect ConfigInfo, initialization for migration failed',
            );
          }
          await appConfigDAO.saveAppConfigToFileStorage(appConfig);
          return appConfig;
        })
        // Then we get all the bookTypes from the configuration and add it as aggregate versions to the database
        .then(initializeApp.initializeInitialBookTypes);
    }

    new SQLiteClient()
      .runMigrations(migrations)
      .catch(reason =>
        logger.error('Failed running the migrations by startup', reason),
      )
      .then(() => setInitializationDatabaseSuccessful(true));
  }, [migrations, startInitializing]);

  return { initializeDatabase, initializationDatabaseSuccessful };
}

export default useInitializeDatabase;
