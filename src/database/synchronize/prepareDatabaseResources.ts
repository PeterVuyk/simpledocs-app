import versioningRepository from '../repository/versioningRepository';
import initializeTables from './initializeTables';
import collectVersions from '../firebase/collectVersions';
import updateDecisionTreeTable from './updateDecisionTreeTable';
import collectDecisionTreeSteps from '../firebase/collectDecisionTreeSteps';
import logger from '../../helper/logger';
import updateCalculationsTable from './updateCalculationsTable';
import collectCalculations from '../firebase/collectCalculations';
import internetConnectivity from '../../helper/internetConnectivity';
import {
  AGGREGATE_APP_CONFIG,
  AGGREGATE_CALCULATIONS,
  AGGREGATE_DECISION_TREE,
  Versioning,
} from '../../model/Versioning';
import collectArticlesByType from '../firebase/collectArticlesByType';
import updateArticleTable from './updateArticleTable';
import { AggregateVersions } from '../../model/AggregateVersions';
import configHelper from '../../helper/configHelper';
import collectConfig from '../firebase/collectConfig';
import appConfigDAO from '../../fileSystem/appConfigDAO';

let aggregateVersions: Versioning[] | undefined;
const setAggregateVersionsCallback: any = (callback: Versioning[]) => {
  aggregateVersions = callback;
};
const getVersionFromAggregate = (aggregate: string): string | undefined => {
  return aggregateVersions?.find(value => value.aggregate === aggregate)
    ?.version;
};

const updateArticleIfNewVersion = async (
  articleType: string,
  versions: AggregateVersions,
) => {
  if (getVersionFromAggregate(articleType) !== versions[articleType]) {
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
  for (const articleInfo of configHelper.getArticleTypes()) {
    const aggregateVersion = versions.find(
      version => version[articleInfo.articleType],
    );
    if (aggregateVersion !== undefined) {
      // eslint-disable-next-line no-await-in-loop
      await updateArticleIfNewVersion(
        articleInfo.articleType,
        aggregateVersion,
      );
    }
  }
};

const updateDecisionTreeIfNewVersion = async (
  versions: AggregateVersions[],
) => {
  const aggregateVersion = versions.find(version => version.decisionTree);
  if (
    aggregateVersion !== undefined &&
    getVersionFromAggregate(AGGREGATE_DECISION_TREE) !==
      aggregateVersion.decisionTree
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
  const aggregateVersion = versions.find(version => version.calculations);
  if (
    aggregateVersion !== undefined &&
    getVersionFromAggregate(AGGREGATE_CALCULATIONS) !==
      aggregateVersion.calculations
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

const cleanupRemovedArticleTypesFromVersioningTable = async (
  versions: AggregateVersions[],
) => {
  versioningRepository
    .getAllVersions(databaseVersions => {
      databaseVersions
        .filter(
          version =>
            version.aggregate !== AGGREGATE_CALCULATIONS &&
            version.aggregate !== AGGREGATE_DECISION_TREE,
        )
        .filter(version => !versions.find(value => value[version.aggregate]))
        .forEach(value => versioningRepository.removeVersion(value));
    })
    .catch(reason =>
      logger.error(
        `failed cleanup (removing) removed articleTypes from versioning table, firebaseVersions: ${versions.map(
          value => Object.entries(value).join(', ').toString(),
        )}`,
        reason,
      ),
    );
};

const updateAppConfigurations = async (versions: AggregateVersions[]) => {
  const aggregateVersion = versions.find(version => version.appConfig);
  if (
    aggregateVersion === undefined ||
    getVersionFromAggregate(AGGREGATE_APP_CONFIG) === aggregateVersion.appConfig
  ) {
    return;
  }
  const appConfig = await collectConfig.getConfig();
  if (!appConfig) {
    logger.errorFromMessage(
      'Called collectConfig.getConfig from prepareDatabaseResources, expected appConfig as a response but no config received.',
    );
    return;
  }

  appConfigDAO.saveAppConfigToFileStorage(appConfig);
  versioningRepository
    .updateVersioning(AGGREGATE_APP_CONFIG, aggregateVersion.appConfig)
    .catch(reason =>
      logger.error(
        'Update version for appConfig failed. By the next startup the appConfig will be fetched again, the update version will be tried to store again',
        reason,
      ),
    );
};

const prepareDatabaseResources = async () => {
  await initializeTables.initialize();
  if (!(await internetConnectivity.hasInternetConnection())) {
    return;
  }
  const firebaseVersions = await collectVersions.getVersioning();
  await versioningRepository.getAllVersions(setAggregateVersionsCallback);
  if (firebaseVersions === null) {
    return;
  }

  await updateAppConfigurations(firebaseVersions)
    .then(() => updateDecisionTreeIfNewVersion(firebaseVersions))
    .then(() => updateArticlesIfNewVersion(firebaseVersions))
    .then(() => updateCalculationsIfNewVersion(firebaseVersions))
    .then(() => updateAppConfigurations(firebaseVersions))
    .catch(reason =>
      logger.error('prepareDatabaseResources failed', reason.message),
    );
  cleanupRemovedArticleTypesFromVersioningTable(firebaseVersions);
};

export default prepareDatabaseResources;
