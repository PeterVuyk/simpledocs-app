import database from './database';
import { DecisionTreeStep } from '../../model/DecisionTreeStep';
import { AGGREGATE_DECISION_TREE } from '../../model/Versioning';

async function getDecisionTreeSteps(): Promise<DecisionTreeStep[]> {
  const querySnapshot = await database()
    .collection(AGGREGATE_DECISION_TREE)
    .where('isDraft', '==', false)
    .get();
  return querySnapshot.docs.map(doc => doc.data() as DecisionTreeStep);
}

const collectDecisionTreeSteps = {
  getDecisionTreeSteps,
};

export default collectDecisionTreeSteps;
