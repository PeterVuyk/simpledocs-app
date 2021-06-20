import versioningRepository from '../repository/versioningRepository';
import collectRegulations from '../firebase/collectRegulations';
import updateRegulationsTable from './updateRegulationsTable';
import initializeVersioningTable from './initializeVersioningTable';
import collectVersions from '../firebase/collectVersions';
import updateDecisionTreeTable from './updateDecisionTreeTable';
import collectDecisionTreeSteps from '../firebase/collectDecisionTreeSteps';
import logger from '../../helper/logger';
import updateCalculationsTable from './updateCalculationsTable';
import collectCalculations from '../firebase/collectCalculations';
import internetConnectivity from '../../helper/internetConnectivity';
import collectInstructionManual from '../firebase/collectInstructionManual';
import updateInstructionManualTable from './updateInstructionManualTable';
import { ARTICLE_TYPE_INSTRUCTION_MANUAL } from '../../model/ArticleType';
import {
  AGGREGATE_CALCULATIONS,
  AGGREGATE_DECISION_TREE,
  AGGREGATE_REGULATIONS,
} from '../../model/Versioning';

const updateInstructionManual = async (newVersion: string) => {
  await collectInstructionManual
    .getInstructionManual()
    .then(article =>
      updateInstructionManualTable.updateInstructionManual(article, newVersion),
    )
    .catch(reason =>
      logger.error(
        'failure in preparing database resources collecting instructionManual from firebase',
        reason,
      ),
    );
};

const updateInstructionManualIfNewVersion = async () => {
  const versionOnFirebase = await collectVersions
    .getVersioning()
    .catch(reason =>
      logger.error(
        'collecting version from firebase in updateInstructionManualIfNewVersion',
        reason,
      ),
    );

  if (versionOnFirebase === undefined) {
    return;
  }

  await versioningRepository.getVersioning(
    ARTICLE_TYPE_INSTRUCTION_MANUAL,
    async versionOnTheApp => {
      if (versionOnTheApp?.version !== versionOnFirebase.instructionManual) {
        await updateInstructionManual(versionOnFirebase.instructionManual);
      }
    },
  );
};

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

  await versioningRepository.getVersioning(
    AGGREGATE_REGULATIONS,
    async versionOnTheApp => {
      if (versionOnTheApp?.version !== versionOnFirebase.regulations) {
        await updateRegulations(versionOnFirebase.regulations);
      }
    },
  );
};

const updateDecisionTree = async (newVersion: string) => {
  await collectDecisionTreeSteps
    .getDecisionTreeSteps()
    .then(steps =>
      updateDecisionTreeTable.updateDecisionTreeSteps(steps, newVersion),
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

  await versioningRepository.getVersioning(
    AGGREGATE_DECISION_TREE,
    async versionOnTheApp => {
      if (versionOnTheApp?.version !== versionOnFirebase.decisionTree) {
        await updateDecisionTree(versionOnFirebase.decisionTree);
      }
    },
  );
};

const updateCalculations = async (newVersion: string) => {
  await collectCalculations
    .getCalculationsInfo()
    .then(calculationsInfo =>
      updateCalculationsTable.updateCalculation(calculationsInfo, newVersion),
    );
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

  await versioningRepository.getVersioning(
    AGGREGATE_CALCULATIONS,
    async versionOnTheApp => {
      if (versionOnTheApp?.version !== versionOnFirebase.calculations) {
        await updateCalculations(versionOnFirebase.calculations);
      }
    },
  );
};

const prepareDatabaseResources = async () => {
  await initializeVersioningTable.initialize();
  if (!(await internetConnectivity.hasInternetConnection())) {
    return;
  }
  await updateRegulationsIfNewVersion()
    .then(updateDecisionTreeIfNewVersion)
    .then(updateInstructionManualIfNewVersion)
    .then(updateCalculationsIfNewVersion)
    .catch(reason =>
      logger.error('prepareDatabaseResources failed', reason.message),
    );
};

export default prepareDatabaseResources;
