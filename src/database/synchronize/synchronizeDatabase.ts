import updateDecisionTreeTable from './updateDecisionTreeTable';
import logger from '../../util/logger';
import updateCalculationsTable from './updateCalculationsTable';
import {
  AGGREGATE_CALCULATIONS,
  AGGREGATE_DECISION_TREE,
} from '../../model/aggregate';
import updateArticleTable from '../synchronize/updateArticleTable';
import calculationsClient from '../../firebase/api/calculationsClient';
import decisionTreeClient from '../../firebase/api/decisionTreeClient';
import articlesClient from '../../firebase/api/articlesClient';
import { SystemConfigurations } from '../../model/SystemConfigurations';
import configurationsDAO from '../../configurations/configurationsDAO';

const updateArticleIfNewVersion = async (
  bookType: string,
  serverVersion: string,
  localVersion: string,
) => {
  if (serverVersion !== localVersion) {
    await articlesClient
      .getArticles(bookType)
      .then(article => {
        updateArticleTable.updateArticles(article, serverVersion, bookType);
      })
      .then(() => {
        configurationsDAO.updateVersioning(bookType, {
          version: serverVersion,
          isBookType: true,
        });
      })
      .catch(reason =>
        logger.error(
          `Update version ${serverVersion} for articles bookType ${bookType} failed. By the next startup the articles will be fetched again, the update version will be tried to store again`,
          reason,
        ),
      );
  }
};

const updateBooksIfNewVersion = async (
  config: SystemConfigurations,
): Promise<void> => {
  const { appConfigurations } = config;
  const books = [
    ...appConfigurations!.firstTab.bookTypes.map(value => value.bookType),
    ...appConfigurations!.secondTab.bookTypes.map(value => value.bookType),
  ];
  for (const aggregate in appConfigurations!.versioning) {
    if (!appConfigurations!.versioning[aggregate].isBookType) {
      continue;
    }
    if (!books.includes(aggregate)) {
      continue;
    }
    await updateArticleIfNewVersion(
      aggregate,
      appConfigurations!.versioning[aggregate].version,
      config.versions[aggregate]?.version ?? '',
    );
  }
};

const updateDecisionTreeIfNewVersion = async (
  serverVersion: string,
  systemConfigurations: SystemConfigurations | undefined,
): Promise<void> => {
  const localVersion = systemConfigurations?.versions[AGGREGATE_DECISION_TREE];
  if (localVersion === undefined || localVersion.version !== serverVersion) {
    await decisionTreeClient
      .getDecisionTreeSteps()
      .then(steps => updateDecisionTreeTable.updateDecisionTreeSteps(steps))
      .then(() => {
        configurationsDAO.updateVersioning(AGGREGATE_DECISION_TREE, {
          version: serverVersion,
          isBookType: false,
        });
      })
      .catch(reason =>
        logger.error(
          'Update version for decisionTree failed. By the next startup the decisionTree will be fetched again, the update version will be tried to store again',
          reason,
        ),
      );
  }
};

const updateCalculationsIfNewVersion = async (
  serverVersion: string,
  systemConfigurations: SystemConfigurations,
): Promise<void> => {
  const localVersion = systemConfigurations.versions[AGGREGATE_CALCULATIONS];
  if (localVersion === undefined || localVersion.version !== serverVersion) {
    await calculationsClient
      .getCalculationsInfo()
      .then(calculationsInfo =>
        updateCalculationsTable.updateCalculation(calculationsInfo),
      )
      .then(() => {
        configurationsDAO.updateVersioning(AGGREGATE_CALCULATIONS, {
          version: serverVersion,
          isBookType: false,
        });
      })
      .catch(reason =>
        logger.error(
          'Update version for calculations failed. By the next startup the calculations will be fetched again, the update version will be tried to store again',
          reason,
        ),
      );
  }
};

const synchronizeDatabase = {
  updateDecisionTreeIfNewVersion,
  updateBooksIfNewVersion,
  updateCalculationsIfNewVersion,
};

export default synchronizeDatabase;
