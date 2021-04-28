import versioningRepository from './repository/versioningRepository';
import collectRegulations from './firebase/collectRegulations';
import { Regulation } from './repository/regulationRepository';
import updateRegulationsTable from './repository/updateRegulationsTable';
import initializeVersioningTable from './repository/initializeVersioningTable';
import collectVersions from './firebase/collectVersions';
import updateDecisionTreeTable from './repository/updateDecisionTreeTable';
import { DecisionTreeStep } from './repository/decisionTreeRepository';
import collectDecisionTreeSteps from './firebase/collectDecisionTreeSteps';

const hasLatestRegulationsVersion = async () => {
  const versionOnTheApp = versioningRepository.getVersioning('regulations');
  const versionOnFirebase = await collectVersions.getVersioning();
  return versionOnTheApp?.version === versionOnFirebase.regulations;
};

const hasLatestDecisionTreeVersion = async () => {
  const versionOnTheApp = versioningRepository.getVersioning('decisionTree');
  const versionOnFirebase = await collectVersions.getVersioning();
  return versionOnTheApp?.version === versionOnFirebase.decisionTree;
};

const updateRegulations = async () => {
  const regulations: Regulation[] = await collectRegulations.getRegulations();
  const versioning = await collectVersions.getVersioning();
  updateRegulationsTable.updateRegulations(regulations, versioning.regulations);
};

const updateDecisionTree = async () => {
  const decisionTreeSteps: DecisionTreeStep[] = await collectDecisionTreeSteps.getDecisionTreeSteps();
  const versioning = await collectVersions.getVersioning();
  updateDecisionTreeTable.updateDecisionTreeSteps(
    decisionTreeSteps,
    versioning.decisionTree,
  );
};

const prepareDatabaseResources = async () => {
  await initializeVersioningTable.initialize();
  if (!(await hasLatestRegulationsVersion())) {
    await updateRegulations();
  }
  if (!(await hasLatestDecisionTreeVersion())) {
    await updateDecisionTree();
  }
};

export default prepareDatabaseResources;
