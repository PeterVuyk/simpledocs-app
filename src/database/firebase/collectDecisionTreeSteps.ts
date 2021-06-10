import database from './database';
import { DecisionTreeStep } from '../model/DecisionTreeStep';

async function getDecisionTreeSteps(): Promise<DecisionTreeStep[]> {
  const querySnapshot = await database().collection('decisionTree').get();
  return querySnapshot.docs.map(doc => doc.data() as DecisionTreeStep);
}

const collectDecisionTreeSteps = {
  getDecisionTreeSteps,
};

export default collectDecisionTreeSteps;
