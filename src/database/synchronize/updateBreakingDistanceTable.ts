import * as SQLite from 'expo-sqlite';
import versioningRepository from '../repository/versioningRepository';
import logger from '../../helper/logger';
import { BreakingDistanceInfo } from '../repository/breakingDistanceRepository';

const db = SQLite.openDatabase('db.db');

function addBreakingDistanceInfo(
  sqlTransaction: SQLite.SQLTransaction,
  breakingDistanceInfo: BreakingDistanceInfo,
): void {
  sqlTransaction.executeSql(
    'INSERT INTO breakingDistance (title, explanation, regulationChapter, breakingDistanceImage, iconFile) VALUES (?, ?, ?, ?, ?)',
    [
      breakingDistanceInfo.title,
      breakingDistanceInfo.explanation,
      breakingDistanceInfo.regulationChapter,
      breakingDistanceInfo.breakingDistanceImage,
      breakingDistanceInfo.iconFile,
    ],
  );
}

function removeAllBreakingDistanceInfo(
  sqlTransaction: SQLite.SQLTransaction,
): void {
  sqlTransaction.executeSql(`DROP TABLE IF EXISTS breakingDistance`, []);
}

function createBreakingDistanceTable(
  sqlTransaction: SQLite.SQLTransaction,
): void {
  sqlTransaction.executeSql(
    'create table if not exists breakingDistance (title text not null constraint breakingDistance_pk primary key, explanation text not null, regulationChapter varchar not null, breakingDistanceImage blob not null, iconFile blob not null);',
  );
}

function updateBreakingDistance(
  breakingDistanceInfo: BreakingDistanceInfo,
  version: string,
): void {
  db.transaction(
    sqlTransaction => {
      removeAllBreakingDistanceInfo(sqlTransaction);
      createBreakingDistanceTable(sqlTransaction);
      versioningRepository.updateVersioning(
        sqlTransaction,
        'breakingDistance',
        version,
      );
      addBreakingDistanceInfo(sqlTransaction, breakingDistanceInfo);
    },
    error =>
      logger.error(
        'Updating breakingDistance failed, rolled back',
        error.message,
      ),
  );
}

const updateBreakingDistanceTable = {
  updateBreakingDistance,
};

export default updateBreakingDistanceTable;
