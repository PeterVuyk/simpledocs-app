import { useEffect, useState } from 'react';
import { Versioning } from '../../model/Versioning';
import versioningRepository from '../repository/versioningRepository';
import { AggregateVersions } from '../../model/AggregateVersions';
import versioningClient from '../../api/versioningClient';
import logger from '../../helper/logger';

function useVersions(isInitialized: boolean) {
  const [databaseVersions, setDatabaseVersions] = useState<Versioning[] | null>(
    null,
  );
  const [serverVersions, setServerVersions] = useState<
    AggregateVersions[] | null
  >(null);

  useEffect(() => {
    if (isInitialized) {
      versioningRepository.getAllVersions(setDatabaseVersions);
      versioningClient
        .getVersioning()
        .then(setServerVersions)
        .catch(reason => {
          logger.error('Failed to get versions from server', reason);
          setServerVersions([]);
        });
    }
  }, [isInitialized]);

  return { databaseVersions, serverVersions };
}

export default useVersions;
