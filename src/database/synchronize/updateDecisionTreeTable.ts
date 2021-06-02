import * as SQLite from 'expo-sqlite';
import { DecisionTreeStep } from '../repository/decisionTreeRepository';
import versioningRepository from '../repository/versioningRepository';
import logger from '../../helper/logger';

const db = SQLite.openDatabase('db.db');

function addDecisionTreeStep(
  sqlTransaction: SQLite.SQLTransaction,
  decisionTreeStep: DecisionTreeStep,
): void {
  sqlTransaction.executeSql(
    'INSERT INTO decisionTree (id, title, label, lineLabel, parentId, regulationChapter, iconFile) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      decisionTreeStep.id,
      decisionTreeStep.title,
      decisionTreeStep.label,
      decisionTreeStep.lineLabel,
      decisionTreeStep.parentId,
      decisionTreeStep.regulationChapter,
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
  sqlTransaction.executeSql(`DROP TABLE IF EXISTS decisionTree`, []);
}

function createDecisionTreeTable(sqlTransaction: SQLite.SQLTransaction): void {
  sqlTransaction.executeSql(
    'create table if not exists decisionTree (id int not null, title text, label text not null, lineLabel varchar, parentId int, regulationChapter varchar, iconFile text);',
  );
}

function updateDecisionTreeSteps(
  decisionTreeSteps: DecisionTreeStep[],
  version: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        removeAllDecisionTree(sqlTransaction);
        createDecisionTreeTable(sqlTransaction);
        versioningRepository.updateVersioning(
          sqlTransaction,
          'decisionTree',
          version,
        );
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