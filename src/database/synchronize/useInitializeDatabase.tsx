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

  const initFirstStartupApp = useCallback(async () => {
    // we get the configurations file from firebase and save it to the fileStorage
    await collectConfig
      .getConfig()
      .then(async appConfig => {
        if (!appConfig) {
          throw Error(
            'Failed to collect ConfigInfo, initialization for migration failed',
          );
        }
        await appConfigDAO.storeAppConfiguration(appConfig);
        return appConfig;
      })
      // Then we add the initial tables. This way we skip the migrations by first startup to speed up the first startup
      .then(initializeApp.initializeInitialTables);
  }, []);

  useEffect(() => {
    if (!startInitializing || migrations === null) {
      return;
    }

    // If no migrations are executed yet, then this was the first startup
    if (migrations.length === 0) {
      initFirstStartupApp().catch(reason => {
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
  }, [initFirstStartupApp, migrations, startInitializing]);

  return { initializeDatabase, initializationDatabaseSuccessful };
}

export default useInitializeDatabase;
