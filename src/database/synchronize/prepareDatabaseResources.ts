import versioningRepository from '../repository/versioningRepository';
import collectRegulations from '../firebase/collectRegulations';
import updateRegulationsTable from './updateRegulationsTable';
import initializeVersioningTable from './initializeVersioningTable';
import collectVersions from '../firebase/collectVersions';
import updateDecisionTreeTable from './updateDecisionTreeTable';
import { DecisionTreeStep } from '../repository/decisionTreeRepository';
import collectDecisionTreeSteps from '../firebase/collectDecisionTreeSteps';
import logger from '../../helper/logger';
import updateCalculationsTable from './updateCalculationsTable';
import { CalculationInfo } from '../repository/calculationsRepository';
import collectCalculations from '../firebase/collectCalculations';

const updateRegulations = async (newVersion: string) => {
  await collectRegulations
    .getRegulations()
    .then(regulations =>
      updateRegulationsTable.updateRegulations(regulations, newVersion),
    )
    .catch(reason =>
      logger.error(
        'failure in preparing database resources collecting regulations from firebase',
        reason,
      ),
    );
};

const updateRegulationsIfNewVersion = async () => {
  const versionOnFirebase = await collectVersions
    .getVersioning()
    .catch(reason =>
      logger.error(
        'collecting version from firebase in updateRegulationsIfNewVersion',
        reason,
      ),
    );

  if (versionOnFirebase === undefined) {
    return;
  }

  await versioningRepository.getVersioning('regulations', versionOnTheApp => {
    if (versionOnTheApp?.version !== versionOnFirebase.regulations) {
      updateRegulations(versionOnFirebase.regulations);
    }
  });
};

const updateDecisionTree = async (newVersion: string) => {
  const decisionTreeSteps: DecisionTreeStep[] =
    await collectDecisionTreeSteps.getDecisionTreeSteps();
  updateDecisionTreeTable.updateDecisionTreeSteps(
    decisionTreeSteps,
    newVersion,
  );
};

const updateDecisionTreeIfNewVersion = async () => {
  const versionOnFirebase = await collectVersions
    .getVersioning()
    .catch(reason =>
      logger.error(
        'collecting version from firebase in updateDecisionTreeIfNewVersion',
        reason,
      ),
    );

  if (versionOnFirebase === undefined) {
    return;
  }

  await versioningRepository.getVersioning('decisionTree', versionOnTheApp => {
    if (versionOnTheApp?.version !== versionOnFirebase.decisionTree) {
      updateDecisionTree(versionOnFirebase.decisionTree);
    }
  });
};

const updateCalculations = async (newVersion: string) => {
  const calculationsInfo: CalculationInfo[] =
    await collectCalculations.getCalculationsInfo();
  updateCalculationsTable.updateCalculation(calculationsInfo, newVersion);
};

const updateCalculationsIfNewVersion = async () => {
  const versionOnFirebase = await collectVersions
    .getVersioning()
    .catch(reason =>
      logger.error(
        'collecting version from firebase in updateCalculationsIfNewVersion',
        reason,
      ),
    );

  if (versionOnFirebase === undefined) {
    return;
  }

  await versioningRepository.getVersioning('calculations', versionOnTheApp => {
    if (versionOnTheApp?.version !== versionOnFirebase.calculations) {
      updateCalculations(versionOnFirebase.calculations);
    }
  });
};

const prepareDatabaseResources = () => {
  initializeVersioningTable
    .initialize()
    .then(updateRegulationsIfNewVersion)
    .then(updateDecisionTreeIfNewVersion)
    .then(updateCalculationsIfNewVersion)
    .catch(reason =>
      logger.error('prepareDatabaseResources failed', reason.message),
    );
};

export default prepareDatabaseResources;
