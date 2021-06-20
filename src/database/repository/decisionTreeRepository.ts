import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';
import { DecisionTreeStep } from '../../model/DecisionTreeStep';
import { DecisionTreeTitle } from '../../model/DecisionTreeTitle';

const db = SQLite.openDatabase('db.db');

function getDecisionTreeByTitle(
  title: string,
  callback: (steps: DecisionTreeStep[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM decisionTree WHERE title = ? ORDER BY id ASC;`,
        [title],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          callback(_array as DecisionTreeStep[]);
        },
      );
    },
    error =>
      logger.error(
        'decisionTreeRepository.getDecisionTreeByTitle failed',
        error.message,
      ),
  );
}

function getDecisionTrees(
  callback: (decisionTree: DecisionTreeTitle[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT title, iconFile FROM decisionTree WHERE iconFile IS NOT NULL;`,
        [],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          if (_array.length !== 0) {
            callback(_array as DecisionTreeTitle[]);
          }
        },
      );
    },
    error =>
      logger.error(
        'decisionTreeRepository.getDecisionTrees failed',
        error.message,
      ),
  );
}

const decisionTreeRepository = {
  getDecisionTreeByTitle,
  getDecisionTrees,
};

export default decisionTreeRepository;
