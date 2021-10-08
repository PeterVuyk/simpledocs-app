import { useCallback, useEffect, useState } from 'react';
import internetConnectivity from '../../helper/internetConnectivity';
import useUpdateAggregates from '../../database/synchronize/useUpdateAggregates';
import useInitializeDatabase from '../../database/synchronize/useInitializeDatabase';
import configurationsStorage from '../../configurations/configurationsStorage';
import configurationsDAO from '../../configurations/configurationsDAO';

const usePrepareResources: () => {
  initialStartupSuccessful: null | boolean;
  internetRequired: null | boolean;
  internetSuggested: null | boolean;
  isAggregatesUpdated: null | boolean;
  onRetry: () => void;
} = () => {
  const [initialStartupSuccessful, setInitialStartupSuccessful] = useState<
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
  const { isAggregatesUpdated, updateAggregates } = useUpdateAggregates();

  const isFirstStartup = async (): Promise<boolean> => {
    return !(await configurationsStorage.getSystemConfiguration());
  };

  const hasInternetConnection = async (): Promise<boolean> => {
    return internetConnectivity.hasInternetConnection();
  };

  const init = useCallback(async () => {
    async function initialize() {
      if ((await isFirstStartup()) && !(await hasInternetConnection())) {
        setInternetRequired(true);
        setInternetSuggested(false);
        setInitialStartupSuccessful(true);
        return;
      }
      setInternetRequired(false);
      if (!(await hasInternetConnection())) {
        setInitialStartupSuccessful(false);
        configurationsDAO.isStartupSuccessful().then(success => {
          setInternetSuggested(success ?? false);
          setInitialStartupSuccessful(success);
        });
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
    setInitialStartupSuccessful(null);
    await init();
  }, [init]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (initializationDatabaseSuccessful === false) {
      setInitialStartupSuccessful(false);
    }
    if (initializationDatabaseSuccessful === true) {
      updateAggregates().then(() => {
        setInitialStartupSuccessful(true);
      });
    }
  }, [initializationDatabaseSuccessful, updateAggregates]);

  return {
    isAggregatesUpdated,
    initialStartupSuccessful,
    internetRequired,
    internetSuggested,
    onRetry: handleRetry,
  };
};

export default usePrepareResources;
