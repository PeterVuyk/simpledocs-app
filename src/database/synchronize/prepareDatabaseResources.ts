import versioningRepository from '../repository/versioningRepository';
import initializeVersioningTable from './initializeVersioningTable';
import collectVersions from '../firebase/collectVersions';
import updateDecisionTreeTable from './updateDecisionTreeTable';
import collectDecisionTreeSteps from '../firebase/collectDecisionTreeSteps';
import logger from '../../helper/logger';
import updateCalculationsTable from './updateCalculationsTable';
import collectCalculations from '../firebase/collectCalculations';
import internetConnectivity from '../../helper/internetConnectivity';
import {
  AGGREGATE_CALCULATIONS,
  AGGREGATE_DECISION_TREE,
  Versioning,
} from '../../model/Versioning';
import collectArticlesByType from '../firebase/collectArticlesByType';
import updateArticleTable from './updateArticleTable';
import { AggregateVersions } from '../../model/AggregateVersions';
import articleTypeHelper from '../../helper/articleTypeHelper';

let versioning: Versioning | undefined;
const setVersionCallback: any = (callback: Versioning) => {
  versioning = callback;
};

const updateArticleIfNewVersion = async (
  articleType: string,
  versions: AggregateVersions,
) => {
  await versioningRepository.getVersioning(articleType, setVersionCallback);
  if (versioning?.version !== versions[articleType]) {
    await collectArticlesByType
      .getArticles(articleType)
      .then(article =>
        updateArticleTable.updateArticles(
          article,
          versions[articleType],
          articleType,
        ),
      )
      .catch(reason =>
        logger.error(
          `failure in preparing database resources collecting articles from firebase articleType: ${updateArticleIfNewVersion}`,
          reason,
        ),
      );
  }
};

const updateArticlesIfNewVersion = async (versions: AggregateVersions[]) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const articleType of articleTypeHelper.getArticles()) {
    const aggregateVersion = versions.find(version => version[articleType]);
    if (aggregateVersion !== undefined) {
      // eslint-disable-next-line no-await-in-loop
      await updateArticleIfNewVersion(articleType, aggregateVersion);
    }
  }
};

const updateDecisionTreeIfNewVersion = async (
  versions: AggregateVersions[],
) => {
  await versioningRepository.getVersioning(
    AGGREGATE_DECISION_TREE,
    setVersionCallback,
  );
  const aggregateVersion = versions.find(version => version.decisionTree);
  if (
    aggregateVersion !== undefined &&
    versioning?.version !== aggregateVersion.decisionTree
  ) {
    await collectDecisionTreeSteps
      .getDecisionTreeSteps()
      .then(steps =>
        updateDecisionTreeTable.updateDecisionTreeSteps(
          steps,
          aggregateVersion.decisionTree,
        ),
      );
  }
};

const updateCalculationsIfNewVersion = async (
  versions: AggregateVersions[],
) => {
  await versioningRepository.getVersioning(
    AGGREGATE_CALCULATIONS,
    setVersionCallback,
  );
  const aggregateVersion = versions.find(version => version.calculations);
  if (
    aggregateVersion !== undefined &&
    versioning?.version !== aggregateVersion.calculations
  ) {
    await collectCalculations
      .getCalculationsInfo()
      .then(calculationsInfo =>
        updateCalculationsTable.updateCalculation(
          calculationsInfo,
          aggregateVersion.calculations,
        ),
      );
  }
};

const prepareDatabaseResources = async () => {
  await initializeVersioningTable.initialize();
  if (!(await internetConnectivity.hasInternetConnection())) {
    return;
  }
  const firebaseVersions = await collectVersions.getVersioning();
  if (firebaseVersions === null) {
    return;
  }

  await updateDecisionTreeIfNewVersion(firebaseVersions)
    .then(() => updateArticlesIfNewVersion(firebaseVersions))
    .then(() => updateCalculationsIfNewVersion(firebaseVersions))
    .catch(reason =>
      logger.error('prepareDatabaseResources failed', reason.message),
    );
};

export default prepareDatabaseResources;
