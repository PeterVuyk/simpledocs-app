import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';

const db = SQLite.openDatabase('db.db');

export interface BreakingDistanceInfo {
  title: string;
  explanation: string;
  regulationChapter: string;
  breakingDistanceImage: string;
  iconFile?: string;
}

type setBreakingDistanceCallback = (
  breakingDistanceInfo: React.SetStateAction<BreakingDistanceInfo | null>,
) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
function getBreakingDistanceInfo(
  setBreakingDistance: setBreakingDistanceCallback,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM breakingDistance;`,
        [],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          if (_array.length === 1) {
            setBreakingDistance(_array[0] as BreakingDistanceInfo);
          }
        },
      );
    },
    error =>
      logger.error(
        'breakingDistanceRepository.getBreakingDistanceInfo failed',
        error.message,
      ),
  );
}

const breakingDistanceRepository = {
  getBreakingDistanceInfo,
};

export default breakingDistanceRepository;
