import * as SQLite from 'expo-sqlite';
import versioningRepository from '../repository/versioningRepository';
import logger from '../../helper/logger';
import { CalculationInfo } from '../repository/calculationsRepository';
import htmlHelper from '../../helper/htmlHelper';

const db = SQLite.openDatabase('db.db');

function addCalculationInfo(
  sqlTransaction: SQLite.SQLTransaction,
  calculationInfo: CalculationInfo,
): void {
  sqlTransaction.executeSql(
    'INSERT INTO calculations (calculationType, title, explanation, regulationButtonText, calculationImage, htmlFile, iconFile) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      calculationInfo.calculationType,
      calculationInfo.title,
      calculationInfo.explanation,
      calculationInfo.regulationButtonText,
      calculationInfo.calculationImage,
      htmlHelper.getHTMLBodyFromBase64(calculationInfo.htmlFile),
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
    'create table if not exists calculations (calculationType text not null constraint calculations_pk primary key, title text not null, explanation text not null, regulationButtonText varchar not null, calculationImage blob not null, htmlFile blob not null, iconFile blob not null);',
  );
}

// TODO: wrap response in promise
function updateCalculation(
  calculationInfo: CalculationInfo[],
  version: string,
): void {
  db.transaction(
    sqlTransaction => {
      removeAllCalculationsInfo(sqlTransaction);
      createCalculationTable(sqlTransaction);
      versioningRepository.updateVersioning(
        sqlTransaction,
        'calculations',
        version,
      );
      addCalculations(sqlTransaction, calculationInfo);
    },
    error =>
      logger.error('Updating calculations failed, rolled back', error.message),
  );
}

const updateCalculationsTable = {
  updateCalculation,
};

export default updateCalculationsTable;
