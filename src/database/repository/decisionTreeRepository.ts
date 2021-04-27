import * as SQLite from 'expo-sqlite';

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
        `SELECT * FROM decisionTree;`,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          if (_array.length === 1) {
            setDecisionTreeSteps(_array[0]);
          }
        },
      );
    },
    error => console.error('getDecisionTreeSteps failed: ', error),
  );
}

const decisionTreeRepository = {
  getDecisionTreeSteps,
};

export default decisionTreeRepository;
