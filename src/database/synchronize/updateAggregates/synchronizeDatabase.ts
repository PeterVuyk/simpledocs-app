import updateDecisionTreeTable from './updateDecisionTreeTable';
import logger from '../../../util/logger';
import updateCalculationsTable from './updateCalculationsTable';
import {
  AGGREGATE_CALCULATIONS,
  AGGREGATE_DECISION_TREE,
} from '../../../model/aggregate';
import updateArticleTable from './updateArticleTable';
import configurationsDAO from '../../../configurations/configurationsDAO';
import { DecisionTreeStep } from '../../../model/DecisionTreeStep';
import { CalculationInfo } from '../../../model/CalculationInfo';
import { Article } from '../../../model/Article';

const updateBook = async (
  bookType: string,
  serverVersion: string,
  articles: Article[],
) => {
  return updateArticleTable
    .updateArticles(articles, serverVersion, bookType)
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
};

const updateDecisionTree = async (
  serverVersion: string,
  decisionTreeSteps: DecisionTreeStep[],
): Promise<void> => {
  return updateDecisionTreeTable
    .updateDecisionTreeSteps(decisionTreeSteps)
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
};

const updateCalculations = async (
  serverVersion: string,
  calculationInfo: CalculationInfo[],
): Promise<void> => {
  return updateCalculationsTable
    .updateCalculation(calculationInfo)
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
};

const synchronizeDatabase = {
  updateDecisionTree,
  updateBook,
  updateCalculations,
};

export default synchronizeDatabase;
