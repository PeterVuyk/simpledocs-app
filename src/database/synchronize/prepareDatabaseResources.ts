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
  ARTICLE_TYPE_BRANCHE_RICHTLIJN_MEDISCHE_HULPVERLENING,
  ARTICLE_TYPE_INSTRUCTION_MANUAL,
  ARTICLE_TYPE_ONTHEFFING_GOEDE_TAAKUITVOERING,
  ARTICLE_TYPE_REGELING_OGS_2009,
  ARTICLE_TYPE_RVV_1990,
  ArticleType,
} from '../../model/ArticleType';
import {
  AGGREGATE_CALCULATIONS,
  AGGREGATE_DECISION_TREE,
} from '../../model/Versioning';
import collectArticlesByType from '../firebase/collectArticlesByType';
import updateArticleTable from './updateArticleTable';

const updateArticles = async (newVersion: string, articleType: ArticleType) => {
  await collectArticlesByType
    .getArticles(articleType)
    .then(article =>
      updateArticleTable.updateArticles(article, newVersion, articleType),
    )
    .catch(reason =>
      logger.error(
        'failure in preparing database resources collecting instructionManual from firebase',
        reason,
      ),
    );
};

const updateArticleIfNewVersion = async (articleType: ArticleType) => {
  const versionOnFirebase = await collectVersions
    .getVersioning()
    .catch(reason =>
      logger.error(
        `collecting version from firebase in updateArticleIfNewVersion: ${articleType}`,
        reason,
      ),
    );

  if (versionOnFirebase === undefined) {
    return;
  }

  await versioningRepository.getVersioning(
    articleType,
    async versionOnTheApp => {
      // @ts-ignore
      if (versionOnTheApp?.version !== versionOnFirebase[articleType]) {
        // @ts-ignore
        await updateArticles(versionOnFirebase[articleType], articleType);
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
  await updateDecisionTreeIfNewVersion()
    .then(() => updateArticleIfNewVersion(ARTICLE_TYPE_INSTRUCTION_MANUAL))
    .then(() => updateArticleIfNewVersion(ARTICLE_TYPE_REGELING_OGS_2009))
    .then(() => updateArticleIfNewVersion(ARTICLE_TYPE_RVV_1990))
    .then(() =>
      updateArticleIfNewVersion(ARTICLE_TYPE_ONTHEFFING_GOEDE_TAAKUITVOERING),
    )
    .then(() =>
      updateArticleIfNewVersion(
        ARTICLE_TYPE_BRANCHE_RICHTLIJN_MEDISCHE_HULPVERLENING,
      ),
    )
    .then(updateCalculationsIfNewVersion)
    .catch(reason =>
      logger.error('prepareDatabaseResources failed', reason.message),
    );
};

export default prepareDatabaseResources;
