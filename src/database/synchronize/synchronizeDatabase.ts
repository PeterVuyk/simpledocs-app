import versioningRepository from '../repository/versioningRepository';
import updateDecisionTreeTable from './updateDecisionTreeTable';
import collectDecisionTreeSteps from '../firebase/collectDecisionTreeSteps';
import logger from '../../helper/logger';
import updateCalculationsTable from './updateCalculationsTable';
import collectCalculations from '../firebase/collectCalculations';
import {
  AGGREGATE_CONFIGURATIONS,
  AGGREGATE_CALCULATIONS,
  AGGREGATE_DECISION_TREE,
  Versioning,
} from '../../model/Versioning';
import collectArticlesByType from '../firebase/collectArticlesByType';
import updateArticleTable from '../synchronize/updateArticleTable';
import { AggregateVersions } from '../../model/AggregateVersions';
import configHelper from '../../helper/configHelper';
import collectConfig from '../firebase/collectConfig';
import appConfigDAO from '../../fileSystem/appConfigDAO';

const getVersionFromAggregate = (
  aggregateVersions: Versioning[],
  aggregate: string,
): string | undefined => {
  return aggregateVersions?.find(value => value.aggregate === aggregate)
    ?.version;
};

const updateArticleIfNewVersion = async (
  bookType: string,
  versions: AggregateVersions,
  aggregateVersions: Versioning[],
) => {
  if (
    getVersionFromAggregate(aggregateVersions, bookType) !== versions[bookType]
  ) {
    await collectArticlesByType
      .getArticles(bookType)
      .then(article =>
        updateArticleTable.updateArticles(
          article,
          versions[bookType],
          bookType,
        ),
      )
      .catch(reason =>
        logger.error(
          `failure in preparing database resources collecting articles from firebase bookType: ${updateArticleIfNewVersion}`,
          reason,
        ),
      );
  }
};

const updateBooksIfNewVersion = async (
  versions: AggregateVersions[],
  aggregateVersions: Versioning[],
) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const bookInfo of await configHelper.getBookTypes()) {
    const aggregateVersion = versions.find(
      version => version[bookInfo.bookType],
    );
    if (aggregateVersion !== undefined) {
      // eslint-disable-next-line no-await-in-loop
      await updateArticleIfNewVersion(
        bookInfo.bookType,
        aggregateVersion,
        aggregateVersions,
      );
    }
  }
};

const updateDecisionTreeIfNewVersion = async (
  versions: AggregateVersions[],
  aggregateVersions: Versioning[],
) => {
  const aggregateVersion = versions.find(version => version.decisionTree);
  if (
    aggregateVersion !== undefined &&
    getVersionFromAggregate(aggregateVersions, AGGREGATE_DECISION_TREE) !==
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
  aggregateVersions: Versioning[],
) => {
  const aggregateVersion = versions.find(version => version.calculations);
  if (
    aggregateVersion !== undefined &&
    getVersionFromAggregate(aggregateVersions, AGGREGATE_CALCULATIONS) !==
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

const cleanupRemovedBookTypesFromVersioningTable = async (
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
        `failed cleanup (removing) removed bookTypes from versioning table, firebaseVersions: ${versions.map(
          value => Object.entries(value).join(', ').toString(),
        )}`,
        reason,
      ),
    );
};

const updateAppConfigurations = async (
  versions: AggregateVersions[],
  aggregateVersions: Versioning[],
) => {
  const aggregateVersion = versions.find(version => version.appConfig);
  if (
    aggregateVersion === undefined ||
    getVersionFromAggregate(aggregateVersions, AGGREGATE_CONFIGURATIONS) ===
      aggregateVersion.appConfig
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

  await appConfigDAO
    .saveAppConfigToFileStorage(appConfig)
    .then(() =>
      versioningRepository
        .updateBookTypeVersioning(
          AGGREGATE_CONFIGURATIONS,
          aggregateVersion.appConfig,
          appConfig,
        )
        .catch(reason =>
          logger.error(
            'Update version for appConfig failed. By the next startup the appConfig will be fetched again, the update version will be tried to store again',
            reason,
          ),
        ),
    )
    .catch(reason =>
      logger.error(
        'Failed saving appConfig to file storage in prepareDatabaseResources, using old config. Will be tried again by next startup app.',
        reason,
      ),
    );
};

const synchronizeDatabase = {
  updateAppConfigurations,
  updateDecisionTreeIfNewVersion,
  updateBooksIfNewVersion,
  updateCalculationsIfNewVersion,
  cleanupRemovedBookTypesFromVersioningTable,
};

export default synchronizeDatabase;
