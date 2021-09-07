import * as SQLite from 'expo-sqlite';
import versioningRepository from '../repository/versioningRepository';
import logger from '../../helper/logger';
import { CalculationInfo } from '../../model/CalculationInfo';
import { AGGREGATE_CALCULATIONS } from '../../model/Versioning';

const db = SQLite.openDatabase('db.db');

function addCalculationInfo(
  sqlTransaction: SQLite.SQLTransaction,
  calculationInfo: CalculationInfo,
): void {
  sqlTransaction.executeSql(
    'INSERT INTO calculations (listIndex, calculationType, title, explanation, articleButtonText, calculationImage, content, contentType, iconFile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      calculationInfo.listIndex,
      calculationInfo.calculationType,
      calculationInfo.title,
      calculationInfo.explanation,
      calculationInfo.articleButtonText,
      calculationInfo.calculationImage,
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

function updateCalculation(
  calculationInfo: CalculationInfo[],
  version: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        removeAllCalculationsInfo(sqlTransaction);
        versioningRepository.updateVersioningWithTransaction(
          sqlTransaction,
          AGGREGATE_CALCULATIONS,
          version,
        );
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
