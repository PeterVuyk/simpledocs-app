import React, { useCallback, useEffect, useState } from 'react';
import appConfigDAO from '../../fileSystem/appConfigDAO';
import internetConnectivity from '../../helper/internetConnectivity';
import initializeApp from '../../database/synchronize/initializeApp';
import logger from '../../helper/logger';
import synchronizeDatabase from '../../database/synchronize/synchronizeDatabase';
import { Versioning } from '../../model/Versioning';
import versioningRepository from '../../database/repository/versioningRepository';
import migrationChangelogRepository from '../../database/repository/migrationChangelogRepository';
import { MigrationChangelog } from '../../model/migrationChangelog';
import SQLiteClient from '../../database/migrations/SQLiteClient';

const usePrepareResources: () => {
  initialStartupFailed: null | boolean;
  internetRequired: null | boolean;
  internetSuggested: null | boolean;
  onRetry: () => void;
} = () => {
  const [initialStartupFailed, setInitialStartupFailed] = useState<
    boolean | null
  >(null);
  const [internetRequired, setInternetRequired] = useState<boolean | null>(
    null,
  );
  const [internetSuggested, setInternetSuggested] = useState<boolean | null>(
    null,
  );
  const [versions, setVersions] = useState<Versioning[] | null>(null);
  const [migrationChangelog, setMigrationChangelog] = useState<
    MigrationChangelog[] | null
  >(null);

  const isFirstStartup = async (): Promise<boolean> => {
    return !(await appConfigDAO.appConfigExistsInFileStorage());
  };

  const hasInternetConnection = async (): Promise<boolean> => {
    const connection = await internetConnectivity.hasInternetConnection();
    return connection;
  };

  const initializeApplication = async (): Promise<void> => {
    await initializeApp.initialize().catch(reason => {
      logger.error('Failed initializing app by startup', reason);
      setInitialStartupFailed(true);
      throw reason;
    });
  };

  useEffect(() => {
    const MINIMUM_NUMBER_OF_VERSIONS = 5;
    if (versions !== null) {
      setInitialStartupFailed(
        versions.length <= MINIMUM_NUMBER_OF_VERSIONS ||
          versions.some(version => version.version === 'initial'),
      );
    }
  }, [versions]);

  const init = useCallback(async () => {
    async function initialize() {
      if ((await isFirstStartup()) && !(await hasInternetConnection())) {
        setInternetRequired(true);
        setInternetSuggested(false);
        setInitialStartupFailed(false);
        return;
      }
      setInternetRequired(false);
      if (!(await hasInternetConnection())) {
        setInternetSuggested(true);
        setInitialStartupFailed(false);
        return;
      }
      setInternetSuggested(false);

      initializeApplication().then(() =>
        migrationChangelogRepository.getMigrationChangelog(
          setMigrationChangelog,
        ),
      );
    }
    await initialize();
  }, []);

  const handleRetry = useCallback(async () => {
    setInternetRequired(null);
    setInternetSuggested(null);
    setInitialStartupFailed(null);
    setMigrationChangelog(null);
    await init();
  }, [init]);

  useEffect(() => {
    if (migrationChangelog === null) {
      return;
    }
    new SQLiteClient()
      .runMigrations(migrationChangelog)
      .then(synchronizeDatabase)
      .then(() => versioningRepository.getAllVersions(setVersions));
  }, [migrationChangelog]);

  useEffect(() => {
    init();
  }, [init]);

  return {
    initialStartupFailed,
    internetRequired,
    internetSuggested,
    onRetry: handleRetry,
  };
};

export default usePrepareResources;
