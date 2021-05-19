import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';

const db = SQLite.openDatabase('db.db');

export interface DecisionTreeStep {
  title: string;
  id: number;
  label: string;
  lineLabel: string;
  parentId: number;
  regulationChapter: string;
}

type setDecisionTreeStepsCallback = (
  decisionTreeSteps: React.SetStateAction<DecisionTreeStep[]>,
) => void;

type setTitlesCallback = (titles: React.SetStateAction<string[]>) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
function getDecisionTreeSteps(
  setDecisionTreeSteps: setDecisionTreeStepsCallback,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM decisionTree ORDER BY title, id ASC;`,
        [],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setDecisionTreeSteps(_array);
        },
      );
    },
    error =>
      logger.error(
        'regulationRepository.getDecisionTreeSteps failed',
        error.message,
      ),
  );
}

interface Title {
  title: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function getDecisionTreeTitles(setTitles: setTitlesCallback): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT DISTINCT title FROM decisionTree;`,
        [],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          if (_array.length !== 0) {
            setTitles(_array.map((result: Title) => result.title));
          }
        },
      );
    },
    error =>
      logger.error(
        'regulationRepository.getDecisionTreeTitles failed',
        error.message,
      ),
  );
}

const decisionTreeRepository = {
  getDecisionTreeSteps,
  getDecisionTreeTitles,
};

export default decisionTreeRepository;
