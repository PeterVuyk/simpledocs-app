import Constants from 'expo-constants';
import { DecisionTreeResponse } from '../model/ApiResponse';
import { DecisionTreeStep } from '../model/DecisionTreeStep';

async function getDecisionTreeSteps(): Promise<DecisionTreeStep[]> {
  const decisionTreeResponse = await fetch(
    new URL('getDecisionTree', process.env.APP_SERVER_API_URL).toString(),
    {
      headers: {
        Accept: `application/json;api-version=${Constants.manifest?.version}`,
      },
    },
  ).then(response => response.json() as Promise<DecisionTreeResponse>);

  if (!decisionTreeResponse.success) {
    throw new Error(
      `Failed collecting decisionTree from server, message server: ${decisionTreeResponse.message}`,
    );
  }
  return decisionTreeResponse.result;
}

const decisionTreeClient = {
  getDecisionTreeSteps,
};

export default decisionTreeClient;
