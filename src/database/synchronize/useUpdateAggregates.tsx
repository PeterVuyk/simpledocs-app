import { useState } from 'react';
import useVersions from './useVersions';
import synchronizeDatabase from './synchronizeDatabase';

function useUpdateAggregates(isInitialized: boolean) {
  const { databaseVersions, serverVersions } = useVersions(isInitialized);
  const [isAggregatesUpdated, setIsAggregatesUpdated] =
    useState<boolean>(false);

  const updateAggregates = async () => {
    if (
      isAggregatesUpdated ||
      serverVersions === null ||
      databaseVersions === null
    ) {
      return;
    }
    setIsAggregatesUpdated(true);
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
  };
  return { databaseVersions, updateAggregates };
}

export default useUpdateAggregates;
