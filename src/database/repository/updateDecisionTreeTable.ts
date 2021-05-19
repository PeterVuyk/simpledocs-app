import * as SQLite from 'expo-sqlite';
import { DecisionTreeStep } from './decisionTreeRepository';
import versioningRepository from './versioningRepository';
import logger from '../../helper/logger';

const db = SQLite.openDatabase('db.db');

function addDecisionTreeStep(
  sqlTransaction: SQLite.SQLTransaction,
  decisionTreeStep: DecisionTreeStep,
): void {
  sqlTransaction.executeSql(
    'INSERT INTO decisionTree (id, title, label, lineLabel, parentId, regulationChapter) VALUES (?, ?, ?, ?, ?, ?)',
    [
      decisionTreeStep.id,
      decisionTreeStep.title,
      decisionTreeStep.label,
      decisionTreeStep.lineLabel,
      decisionTreeStep.parentId,
      decisionTreeStep.regulationChapter,
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
    'create table decisionTree (id int not null, title varchar, label varchar not null, lineLabel varchar, parentId int, regulationChapter varchar);',
  );
}

function updateDecisionTreeSteps(
  decisionTreeSteps: DecisionTreeStep[],
  version: string,
): void {
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
    error =>
      logger.error('Updating decisionTree failed, rolled back', error.message),
  );
}

const updateDecisionTreeTable = {
  updateDecisionTreeSteps,
};

export default updateDecisionTreeTable;
