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
    'INSERT INTO calculations (calculationType, title, explanation, articleButtonText, calculationImage, articleChapter, articleType, iconFile) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      calculationInfo.calculationType,
      calculationInfo.title,
      calculationInfo.explanation,
      calculationInfo.articleButtonText,
      calculationInfo.calculationImage,
      calculationInfo.articleChapter,
      calculationInfo.articleType,
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
  sqlTransaction.executeSql(`DROP TABLE IF EXISTS calculations`, []);
}

function createCalculationTable(sqlTransaction: SQLite.SQLTransaction): void {
  sqlTransaction.executeSql(
    'create table if not exists calculations (calculationType text not null constraint calculations_pk primary key, title text not null, explanation text not null, articleButtonText varchar not null, calculationImage blob not null, articleChapter varchar not null, articleType varchar not null, iconFile blob not null);',
  );
}

function updateCalculation(
  calculationInfo: CalculationInfo[],
  version: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        removeAllCalculationsInfo(sqlTransaction);
        createCalculationTable(sqlTransaction);
        versioningRepository.updateVersioning(
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
