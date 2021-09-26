import { useState } from 'react';
import useVersions from './useVersions';
import synchronizeDatabase from './synchronizeDatabase';

function useUpdateAggregates(isInitialized: boolean) {
  const { databaseVersions, serverVersions } = useVersions(isInitialized);
  const [isAggregatesUpdated, setIsAggregatesUpdated] = useState<
    null | boolean
  >(null);

  const updateAggregates = async () => {
    if (
      isAggregatesUpdated !== null ||
      serverVersions === null ||
      databaseVersions === null
    ) {
      return;
    }
    // If the app can not get the versions from the server, return.
    if (serverVersions.length === 0) {
      setIsAggregatesUpdated(true);
      return;
    }
    setIsAggregatesUpdated(false);
    await synchronizeDatabase
      .updateAppConfigurations(serverVersions, databaseVersions)
      .then(() =>
        synchronizeDatabase.updateDecisionTreeIfNewVersion(
          serverVersions,
          databaseVersions,
        ),
      )
      .then(() =>
        synchronizeDatabase.updateBooksIfNewVersion(
          serverVersions,
          databaseVersions,
        ),
      )
      .then(() =>
        synchronizeDatabase.updateCalculationsIfNewVersion(
          serverVersions,
          databaseVersions,
        ),
      )
      .then(() =>
        synchronizeDatabase.cleanupRemovedBookTypesFromVersioningTable(
          serverVersions,
        ),
      );
    setIsAggregatesUpdated(true);
  };
  return { isAggregatesUpdated, databaseVersions, updateAggregates };
}

export default useUpdateAggregates;
