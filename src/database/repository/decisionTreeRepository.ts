import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';

const db = SQLite.openDatabase('db.db');

export interface DecisionTreeStep {
  id: number;
  label: string;
  lineLabel: string;
  parentId: number;
  regulationChapter: string;
}

type setDecisionTreeStepsCallback = (
  decisionTreeSteps: React.SetStateAction<DecisionTreeStep[]>,
) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
function getDecisionTreeSteps(
  setDecisionTreeSteps: setDecisionTreeStepsCallback,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM decisionTree ORDER BY id ASC;`,
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

const decisionTreeRepository = {
  getDecisionTreeSteps,
};

export default decisionTreeRepository;
