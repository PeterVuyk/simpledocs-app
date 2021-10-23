import Constants from 'expo-constants';
import { DecisionTreeResponse } from '../model/ApiResponse';
import { DecisionTreeStep } from '../model/DecisionTreeStep';
import Firebase from '../authentication/firebase';

async function getDecisionTreeSteps(): Promise<DecisionTreeStep[]> {
  const response = await Firebase.functions(process.env.FIREBASE_REGION)
    .httpsCallable('getDecisionTree')({
      appVersion: Constants.manifest?.version,
    })
    .then(value => value.data as DecisionTreeResponse);
  if (!response.success) {
    throw new Error(
      `Failed collecting DecisionTree from server, message server: ${response.message}`,
    );
  }
  return response.result!;
}

const decisionTreeClient = {
  getDecisionTreeSteps,
};

export default decisionTreeClient;
