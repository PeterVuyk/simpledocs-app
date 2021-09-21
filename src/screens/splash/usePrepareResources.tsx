import { useCallback, useEffect, useState } from 'react';
import appConfigDAO from '../../fileSystem/appConfigDAO';
import internetConnectivity from '../../helper/internetConnectivity';
import useUpdateAggregates from '../../database/synchronize/useUpdateAggregates';
import useInitializeDatabase from '../../database/synchronize/useInitializeDatabase';

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
  const { initializeDatabase, initializationDatabaseSuccessful } =
    useInitializeDatabase();
  const { databaseVersions, updateAggregates } = useUpdateAggregates(
    initializationDatabaseSuccessful ?? false,
  );

  const isFirstStartup = async (): Promise<boolean> => {
    return !(await appConfigDAO.appConfigExistsInFileStorage());
  };

  const hasInternetConnection = async (): Promise<boolean> => {
    const connection = await internetConnectivity.hasInternetConnection();
    return connection;
  };

  useEffect(() => {
    const MINIMUM_NUMBER_OF_VERSIONS = 5;
    if (databaseVersions !== null) {
      setInitialStartupFailed(
        databaseVersions.length <= MINIMUM_NUMBER_OF_VERSIONS ||
          databaseVersions.some(version => version.version === 'initial'),
      );
    }
  }, [databaseVersions]);

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

      await initializeDatabase();
    }
    await initialize();
  }, [initializeDatabase]);

  const handleRetry = useCallback(async () => {
    setInternetRequired(null);
    setInternetSuggested(null);
    setInitialStartupFailed(null);
    await init();
  }, [init]);

  useEffect(() => {
    if (initializationDatabaseSuccessful === false) {
      setInitialStartupFailed(true);
    }
    if (initializationDatabaseSuccessful === true) {
      updateAggregates().then(() => setInitialStartupFailed(false));
    }
  }, [initializationDatabaseSuccessful, updateAggregates]);

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
