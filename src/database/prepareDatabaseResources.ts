import versioningRepository from './repository/versioningRepository';
import collectRegulations from './firebase/collectRegulations';
import { Regulation } from './repository/regulationRepository';
import updateDatabase from './repository/updateDatabase';
import initializeDatabase from './repository/initializeDatabase';

const hasLatestVersion = async () => {
  const versionOnTheApp = versioningRepository.getVersioning('regulations');
  const versionOnFirebase = await collectRegulations.getRegulationVersioning();
  return versionOnTheApp?.version === versionOnFirebase.regulations;
};

const updateRegulations = async () => {
  const regulations: Regulation[] = await collectRegulations.getRegulations();
  const versioning = await collectRegulations.getRegulationVersioning();
  updateDatabase.updateRegulations(regulations, versioning.regulations);
};

const prepareDatabaseResources = async () => {
  initializeDatabase.initialize();
  if (await hasLatestVersion()) {
    return;
  }
  await updateRegulations();
};

export default prepareDatabaseResources;
