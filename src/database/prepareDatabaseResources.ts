import versioningRepository from './repository/versioningRepository';
import collectRegulations from './firebase/collectRegulations';
import { Regulation } from './repository/regulationRepository';
import updateRegulationsTable from './repository/updateRegulationsTable';
import initializeVersioningTable from './repository/initializeVersioningTable';
import collectVersions from './firebase/collectVersions';
import updateDecisionTreeTable from './repository/updateDecisionTreeTable';
import { DecisionTreeStep } from './repository/decisionTreeRepository';
import collectDecisionTreeSteps from './firebase/collectDecisionTreeSteps';

const updateRegulations = async (newVersion: string) => {
  const regulations: Regulation[] = await collectRegulations.getRegulations();
  updateRegulationsTable.updateRegulations(regulations, newVersion);
};

const updateRegulationsIfNewVersion = async () => {
  const versionOnFirebase = await collectVersions.getVersioning();
  versioningRepository.getVersioning('regulations', versionOnTheApp => {
    if (versionOnTheApp?.version !== versionOnFirebase.regulations) {
      updateRegulations(versionOnFirebase.regulations);
    }
  });
};

const updateDecisionTree = async (newVersion: string) => {
  const decisionTreeSteps: DecisionTreeStep[] = await collectDecisionTreeSteps.getDecisionTreeSteps();
  updateDecisionTreeTable.updateDecisionTreeSteps(
    decisionTreeSteps,
    newVersion,
  );
};

const updateDecisionTreeIfNewVersion = async () => {
  const versionOnFirebase = await collectVersions.getVersioning();
  versioningRepository.getVersioning('decisionTree', versionOnTheApp => {
    if (versionOnTheApp?.version !== versionOnFirebase.decisionTree) {
      updateDecisionTree(versionOnFirebase.decisionTree);
    }
  });
};

const prepareDatabaseResources = async () => {
  await initializeVersioningTable.initialize();
  await updateRegulationsIfNewVersion();
  await updateDecisionTreeIfNewVersion();
};

export default prepareDatabaseResources;
