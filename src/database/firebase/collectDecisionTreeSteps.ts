import database from './database';

export interface DecisionTreeStep {
  id: number;
  label: string;
  lineLabel?: string;
  parentId?: number;
  regulationChapter?: string;
}

async function getDecisionTreeSteps(): Promise<DecisionTreeStep[]> {
  const querySnapshot = await database().collection('decisionTree').get();
  return querySnapshot.docs.map(doc => doc.data() as DecisionTreeStep);
}

const collectRegulations = {
  getDecisionTreeSteps,
};

export default collectRegulations;
