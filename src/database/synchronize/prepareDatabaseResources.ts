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
  Versioning,
} from '../../model/Versioning';
import collectArticlesByType from '../firebase/collectArticlesByType';
import updateArticleTable from './updateArticleTable';
import { AggregateVersions } from '../../model/AggregateVersions';

let versioning: Versioning | undefined;
const setVersionCallback: any = (callback: Versioning) => {
  versioning = callback;
};

const updateArticleIfNewVersion = async (
  articleType: ArticleType,
  versions: AggregateVersions,
) => {
  await versioningRepository.getVersioning(articleType, setVersionCallback);
  // @ts-ignore
  if (versioning?.version !== versions[articleType]) {
    await collectArticlesByType
      .getArticles(articleType)
      .then(article =>
        updateArticleTable.updateArticles(
          article,
          // @ts-ignore
          versions[articleType],
          articleType,
        ),
      )
      .catch(reason =>
        logger.error(
          'failure in preparing database resources collecting instructionManual from firebase',
          reason,
        ),
      );
  }
};

const updateDecisionTreeIfNewVersion = async (versions: AggregateVersions) => {
  await versioningRepository.getVersioning(
    AGGREGATE_DECISION_TREE,
    setVersionCallback,
  );
  if (versioning?.version !== versions.decisionTree) {
    await collectDecisionTreeSteps
      .getDecisionTreeSteps()
      .then(steps =>
        updateDecisionTreeTable.updateDecisionTreeSteps(
          steps,
          versions.decisionTree,
        ),
      );
  }
};

const updateCalculationsIfNewVersion = async (versions: AggregateVersions) => {
  await versioningRepository.getVersioning(
    AGGREGATE_CALCULATIONS,
    setVersionCallback,
  );
  if (versioning?.version !== versions.calculations) {
    await collectCalculations
      .getCalculationsInfo()
      .then(calculationsInfo =>
        updateCalculationsTable.updateCalculation(
          calculationsInfo,
          versions.calculations,
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
  // TODO: If firebaseVersions == null ? show error message.
  if (firebaseVersions === null) {
    return;
  }

  await updateDecisionTreeIfNewVersion(firebaseVersions)
    .then(() =>
      updateArticleIfNewVersion(
        ARTICLE_TYPE_INSTRUCTION_MANUAL,
        firebaseVersions,
      ),
    )
    .then(() =>
      updateArticleIfNewVersion(
        ARTICLE_TYPE_REGELING_OGS_2009,
        firebaseVersions,
      ),
    )
    .then(() =>
      updateArticleIfNewVersion(ARTICLE_TYPE_RVV_1990, firebaseVersions),
    )
    .then(() =>
      updateArticleIfNewVersion(
        ARTICLE_TYPE_ONTHEFFING_GOEDE_TAAKUITVOERING,
        firebaseVersions,
      ),
    )
    .then(() =>
      updateArticleIfNewVersion(
        ARTICLE_TYPE_BRANCHE_RICHTLIJN_MEDISCHE_HULPVERLENING,
        firebaseVersions,
      ),
    )
    .then(() => updateCalculationsIfNewVersion(firebaseVersions))
    .catch(reason =>
      logger.error('prepareDatabaseResources failed', reason.message),
    );
};

export default prepareDatabaseResources;
