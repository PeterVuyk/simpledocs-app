import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';
import { DecisionTreeStep } from '../model/DecisionTreeStep';

const db = SQLite.openDatabase('db.db');

type setDecisionTreeStepsCallback = (
  decisionTreeSteps: React.SetStateAction<DecisionTreeStep[]>,
) => void;

type setTitlesCallback = (titles: React.SetStateAction<Title[]>) => void;

function getDecisionTreeByTitle(
  title: string,
  setDecisionTreeSteps: setDecisionTreeStepsCallback,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM decisionTree WHERE title = ? ORDER BY id ASC;`,
        [title],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setDecisionTreeSteps(_array as DecisionTreeStep[]);
        },
      );
    },
    error =>
      logger.error(
        'decisionTreeRepository.getDecisionTreeByTitle failed',
        error.message,
      ),
  );
}

export interface Title {
  title: string;
  iconFile: string;
}

// TODO: rename function
// eslint-disable-next-line @typescript-eslint/ban-types
function getDecisionTreeTitles(setTitles: setTitlesCallback): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT title, iconFile FROM decisionTree WHERE iconFile IS NOT NULL;`,
        [],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          if (_array.length !== 0) {
            setTitles(_array as Title[]);
          }
        },
      );
    },
    error =>
      logger.error(
        'decisionTreeRepository.getDecisionTreeTitles failed',
        error.message,
      ),
  );
}

const decisionTreeRepository = {
  getDecisionTreeByTitle,
  getDecisionTreeTitles,
};

export default decisionTreeRepository;
