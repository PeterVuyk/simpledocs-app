import versioningRepository from '../repository/versioningRepository';
import updateDecisionTreeTable from './updateDecisionTreeTable';
import logger from '../../helper/logger';
import updateCalculationsTable from './updateCalculationsTable';
import {
  AGGREGATE_APP_CONFIGURATIONS,
  AGGREGATE_CALCULATIONS,
  AGGREGATE_DECISION_TREE,
  Versioning,
} from '../../model/Versioning';
import updateArticleTable from '../synchronize/updateArticleTable';
import { AggregateVersions } from '../../model/AggregateVersions';
import configHelper from '../../helper/configHelper';
import configurationsDAO from '../../fileSystem/configurationsDAO';
import calculationsClient from '../../api/calculationsClient';
import decisionTreeClient from '../../api/decisionTreeClient';
import appConfigurationsClient from '../../api/appConfigurationsClient';
import articlesClient from '../../api/articlesClient';

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
    getVersionFromAggregate(aggregateVersions, bookType) !== versions.version
  ) {
    await articlesClient
      .getArticles(bookType)
      .then(article =>
        updateArticleTable.updateArticles(article, versions.version, bookType),
      )
      .catch(reason =>
        logger.error(
          `Update version for articles bookType ${bookType} failed. By the next startup the articles will be fetched again, the update version will be tried to store again`,
          reason,
        ),
      );
  }
};

const updateBooksIfNewVersion = async (
  versions: AggregateVersions[],
  aggregateVersions: Versioning[],
): Promise<void> => {
  for (const bookInfo of await configHelper.getBookTypes()) {
    const aggregateVersion = versions.find(
      version => version.aggregate === bookInfo.bookType,
    );
    if (aggregateVersion !== undefined) {
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
): Promise<void> => {
  const aggregateVersion = versions.find(
    version => version.aggregate === AGGREGATE_DECISION_TREE,
  );
  if (
    aggregateVersion !== undefined &&
    getVersionFromAggregate(aggregateVersions, AGGREGATE_DECISION_TREE) !==
      aggregateVersion.version
  ) {
    await decisionTreeClient
      .getDecisionTreeSteps()
      .then(steps =>
        updateDecisionTreeTable.updateDecisionTreeSteps(
          steps,
          aggregateVersion.version,
        ),
      )
      .catch(reason =>
        logger.error(
          'Update version for decisionTree failed. By the next startup the decisionTree will be fetched again, the update version will be tried to store again',
          reason,
        ),
      );
  }
};

const updateCalculationsIfNewVersion = async (
  versions: AggregateVersions[],
  aggregateVersions: Versioning[],
): Promise<void> => {
  const aggregateVersion = versions.find(
    version => version.aggregate === AGGREGATE_CALCULATIONS,
  );
  if (
    aggregateVersion !== undefined &&
    getVersionFromAggregate(aggregateVersions, AGGREGATE_CALCULATIONS) !==
      aggregateVersion.version
  ) {
    await calculationsClient
      .getCalculationsInfo()
      .then(calculationsInfo =>
        updateCalculationsTable.updateCalculation(
          calculationsInfo,
          aggregateVersion.version,
        ),
      )
      .catch(reason =>
        logger.error(
          'Update version for calculations failed. By the next startup the calculations will be fetched again, the update version will be tried to store again',
          reason,
        ),
      );
  }
};

const cleanupRemovedBookTypesFromVersioningTable = async (
  versions: AggregateVersions[],
): Promise<void> => {
  versioningRepository
    .getAllVersions(databaseVersions => {
      databaseVersions
        .filter(
          version =>
            version.aggregate !== AGGREGATE_CALCULATIONS &&
            version.aggregate !== AGGREGATE_DECISION_TREE,
        )
        .filter(
          version =>
            !versions.find(value => value.aggregate === version.aggregate),
        )
        .forEach(value => versioningRepository.removeVersion(value));
    })
    .catch(reason =>
      logger.error(
        `failed cleanup (removing) removed bookTypes from versioning table, server versions: ${versions.map(
          value => Object.entries(value).join(', ').toString(),
        )}`,
        reason,
      ),
    );
};

const updateAppConfigurations = async (
  versions: AggregateVersions[],
  aggregateVersions: Versioning[],
): Promise<void> => {
  const aggregateVersion = versions.find(
    version => version.aggregate === AGGREGATE_APP_CONFIGURATIONS,
  );
  if (
    aggregateVersion === undefined ||
    getVersionFromAggregate(aggregateVersions, AGGREGATE_APP_CONFIGURATIONS) ===
      aggregateVersion.version
  ) {
    return;
  }
  const configurations = await appConfigurationsClient
    .getAppConfigurations()
    .catch(reason =>
      logger.error(
        'Update version for configurations failed. By the next startup the configurations will be fetched again, the update version will be tried to store again',
        reason,
      ),
    );
  if (!configurations) {
    return;
  }

  await configurationsDAO
    .storeAppConfiguration(configurations)
    .then(() =>
      versioningRepository
        .updateBookTypeVersioning(
          AGGREGATE_APP_CONFIGURATIONS,
          aggregateVersion.version,
          configurations,
        )
        .catch(reason =>
          logger.error(
            'Update version for configurations failed. By the next startup the appConfigurations will be fetched again, the update version will be tried to store again',
            reason,
          ),
        ),
    )
    .catch(reason =>
      logger.error(
        'Failed saving configurations to file storage in prepareDatabaseResources, using old config. Will be tried again by next startup app.',
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
