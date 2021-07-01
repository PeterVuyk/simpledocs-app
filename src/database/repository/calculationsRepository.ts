import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';
import { CalculationInfo } from '../../model/CalculationInfo';
import {
  BRAKING_DISTANCE,
  OVERTAKING_DISTANCE,
  REACTION_PATH_DISTANCE,
  STOPPING_DISTANCE,
} from '../../model/CalculationType';

const db = SQLite.openDatabase('db.db');

function getCalculationsInfo(
  callback: (calculations: CalculationInfo[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM calculations WHERE calculationType IN (?, ?, ?, ?) ORDER BY listIndex`,
        [
          OVERTAKING_DISTANCE,
          STOPPING_DISTANCE,
          BRAKING_DISTANCE,
          REACTION_PATH_DISTANCE,
        ],
        // @ts-ignore
        (_, { rows: { _array } }) => {
          callback(_array as CalculationInfo[]);
        },
      );
    },
    error =>
      logger.error(
        'getCalculationsInfo.getCalculationsInfo failed',
        error.message,
      ),
  );
}

function getCalculationInfoByTitle(
  title: string,
  callback: (calculationInfo: CalculationInfo) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM calculations WHERE title = ? LIMIT 1;`,
        [title],
        // @ts-ignore
        (_, { rows: { _array } }) => {
          if (_array.length === 1) {
            callback(_array[0] as CalculationInfo);
          }
        },
      );
    },
    error =>
      logger.error(
        'getCalculationsInfo.getCalculationInfoByTitle failed',
        error.message,
      ),
  );
}

const calculationsRepository = {
  getCalculationsInfo,
  getCalculationInfoByTitle,
};

export default calculationsRepository;
