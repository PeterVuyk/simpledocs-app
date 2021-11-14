import * as SQLite from 'expo-sqlite';
import logger from '../../util/logger';
import { DecisionTreeStep } from '../../model/decisionTree/DecisionTreeStep';
import { DecisionTreeTitle } from '../../model/decisionTree/DecisionTreeTitle';

const db = SQLite.openDatabase('db.db');

function getDecisionTreeByTitle(
  title: string,
  callback: (steps: DecisionTreeStep[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM decisionTrees WHERE title = ? ORDER BY id ASC;`,
        [title],
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
        `SELECT title, iconFile FROM decisionTrees WHERE iconFile IS NOT NULL;`,
        [],
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
