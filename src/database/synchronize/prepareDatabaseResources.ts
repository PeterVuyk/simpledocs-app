import versioningRepository from '../repository/versioningRepository';
import collectRegulations from '../firebase/collectRegulations';
import updateRegulationsTable from './updateRegulationsTable';
import initializeVersioningTable from './initializeVersioningTable';
import collectVersions from '../firebase/collectVersions';
import updateDecisionTreeTable from './updateDecisionTreeTable';
import { DecisionTreeStep } from '../repository/decisionTreeRepository';
import collectDecisionTreeSteps from '../firebase/collectDecisionTreeSteps';
import logger from '../../helper/logger';
import updateBreakingDistanceTable from './updateBreakingDistanceTable';
import { BreakingDistanceInfo } from '../repository/breakingDistanceRepository';
import collectBreakingDistance from '../firebase/collectBreakingDistance';

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

const updateBreakingDistance = async (newVersion: string) => {
  const breakingDistance: BreakingDistanceInfo =
    await collectBreakingDistance.getBreakingDistanceInfo();
  updateBreakingDistanceTable.updateBreakingDistance(
    breakingDistance,
    newVersion,
  );
};

const updateBreakingDistanceIfNewVersion = async () => {
  const versionOnFirebase = await collectVersions
    .getVersioning()
    .catch(reason =>
      logger.error(
        'collecting version from firebase in updateBreakingDistanceIfNewVersion',
        reason,
      ),
    );

  if (versionOnFirebase === undefined) {
    return;
  }

  await versioningRepository.getVersioning(
    'breakingDistance',
    versionOnTheApp => {
      if (versionOnTheApp?.version !== versionOnFirebase.decisionTree) {
        updateBreakingDistance(versionOnFirebase.decisionTree);
      }
    },
  );
};

const prepareDatabaseResources = () => {
  initializeVersioningTable
    .initialize()
    .then(updateRegulationsIfNewVersion)
    .then(updateDecisionTreeIfNewVersion)
    .then(updateBreakingDistanceIfNewVersion)
    .catch(reason =>
      logger.error('prepareDatabaseResources failed', reason.message),
    );
};

export default prepareDatabaseResources;
