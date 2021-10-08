import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';
import { DecisionTreeStep } from '../../model/DecisionTreeStep';

const db = SQLite.openDatabase('db.db');

function addDecisionTreeStep(
  sqlTransaction: SQLite.SQLTransaction,
  decisionTreeStep: DecisionTreeStep,
): void {
  sqlTransaction.executeSql(
    'INSERT INTO decisionTrees (id, title, label, lineLabel, parentId, content, contentType, iconFile) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      `${decisionTreeStep.id}`,
      decisionTreeStep.title,
      decisionTreeStep.label,
      decisionTreeStep.lineLabel,
      `${decisionTreeStep.parentId}`,
      decisionTreeStep.content,
      decisionTreeStep.contentType,
      decisionTreeStep.iconFile,
    ],
  );
}

function addDecisionTreeSteps(
  sqlTransaction: SQLite.SQLTransaction,
  decisionTree: DecisionTreeStep[],
): void {
  decisionTree.forEach(step => addDecisionTreeStep(sqlTransaction, step));
}

function removeAllDecisionTree(sqlTransaction: SQLite.SQLTransaction): void {
  sqlTransaction.executeSql(`DELETE FROM decisionTrees`, []);
}

function updateDecisionTreeSteps(
  decisionTreeSteps: DecisionTreeStep[],
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        removeAllDecisionTree(sqlTransaction);
        addDecisionTreeSteps(sqlTransaction, decisionTreeSteps);
      },
      error => {
        logger.error(
          'Updating decisionTree failed, rolled back',
          error.message,
        );
        reject();
      },
      resolve,
    );
  });
}

const updateDecisionTreeTable = {
  updateDecisionTreeSteps,
};

export default updateDecisionTreeTable;
