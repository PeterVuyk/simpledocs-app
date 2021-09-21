import { useEffect, useState } from 'react';
import { Versioning } from '../../model/Versioning';
import versioningRepository from '../repository/versioningRepository';
import collectVersions from '../firebase/collectVersions';
import { AggregateVersions } from '../../model/AggregateVersions';

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
      collectVersions.getVersioning().then(setServerVersions);
    }
  }, [isInitialized]);

  return { databaseVersions, serverVersions };
}

export default useVersions;
