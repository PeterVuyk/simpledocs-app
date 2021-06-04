import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';

const db = SQLite.openDatabase('db.db');

export interface CalculationInfo {
  calculationType: string;
  title: string;
  explanation: string;
  calculationImage: string;
  regulationButtonText: string;
  regulationChapter: string;
  iconFile: string;
}

type setCalculationsCallback = (
  calculations: React.SetStateAction<CalculationInfo[]>,
) => void;

type setCalculationCallback = (
  calculationInfo: React.SetStateAction<CalculationInfo | null>,
) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
function getCalculationsInfo(setCalculations: setCalculationsCallback): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM calculations;`,
        [],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setCalculations(_array as CalculationInfo[]);
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

// eslint-disable-next-line @typescript-eslint/ban-types
function getCalculationInfoByTitle(
  title: string,
  setCalculation: setCalculationCallback,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM calculations WHERE title = ? LIMIT 1;`,
        [title],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          if (_array.length === 1) {
            setCalculation(_array[0] as CalculationInfo);
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
