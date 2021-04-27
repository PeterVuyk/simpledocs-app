import versioningRepository from './repository/versioningRepository';
import collectRegulations from './firebase/collectRegulations';
import { Regulation } from './repository/regulationRepository';
import updateRegulationsTable from './repository/updateRegulationsTable';
import initializeDatabase from './repository/initializeDatabase';
import collectVersions from './firebase/collectVersions';

const hasLatestVersion = async () => {
  const versionOnTheApp = versioningRepository.getVersioning('regulations');
  const versionOnFirebase = await collectVersions.getRegulationVersioning();
  return versionOnTheApp?.version === versionOnFirebase.regulations;
};

const updateRegulations = async () => {
  const regulations: Regulation[] = await collectRegulations.getRegulations();
  const versioning = await collectVersions.getRegulationVersioning();
  updateRegulationsTable.updateRegulations(regulations, versioning.regulations);
};

const prepareDatabaseResources = async () => {
  await initializeDatabase.initialize();
  if (await hasLatestVersion()) {
    return;
  }
  await updateRegulations();
};

export default prepareDatabaseResources;
