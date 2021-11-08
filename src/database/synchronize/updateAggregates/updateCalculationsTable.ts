import * as SQLite from 'expo-sqlite';
import logger from '../../../util/logger';
import { CalculationInfo } from '../../../model/CalculationInfo';

const db = SQLite.openDatabase('db.db');

function addCalculationInfo(
  sqlTransaction: SQLite.SQLTransaction,
  calculationInfo: CalculationInfo,
): void {
  sqlTransaction.executeSql(
    'INSERT INTO calculations (listIndex, calculationType, title, explanation, content, contentType, iconFile) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      calculationInfo.listIndex,
      calculationInfo.calculationType,
      calculationInfo.title,
      calculationInfo.explanation,
      calculationInfo.content,
      calculationInfo.contentType,
      calculationInfo.iconFile,
    ],
  );
}

function addCalculations(
  sqlTransaction: SQLite.SQLTransaction,
  calculations: CalculationInfo[],
): void {
  calculations.forEach(calculationInfo =>
    addCalculationInfo(sqlTransaction, calculationInfo),
  );
}

function removeAllCalculationsInfo(
  sqlTransaction: SQLite.SQLTransaction,
): void {
  sqlTransaction.executeSql(`DELETE FROM calculations`, []);
}

function updateCalculation(calculationInfo: CalculationInfo[]): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        removeAllCalculationsInfo(sqlTransaction);
        addCalculations(sqlTransaction, calculationInfo);
      },
      error => {
        logger.error(
          'Updating calculations failed, rolled back',
          error.message,
        );
        reject();
      },
      resolve,
    );
  });
}

const updateCalculationsTable = {
  updateCalculation,
};

export default updateCalculationsTable;
