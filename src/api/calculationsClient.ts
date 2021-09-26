import Constants from 'expo-constants';
import { CalculationResponse } from '../model/ApiResponse';
import { CalculationInfo } from '../model/CalculationInfo';

async function getCalculationsInfo(): Promise<CalculationInfo[]> {
  const calculationResponse = await fetch(
    new URL('getCalculations', process.env.APP_SERVER_API_URL).toString(),
    {
      headers: {
        Accept: `application/json;api-version=${Constants.manifest?.version}`,
      },
    },
  ).then(response => response.json() as Promise<CalculationResponse>);

  if (!calculationResponse.success) {
    throw new Error(
      `Failed collecting calculations from server, message server: ${calculationResponse.message}`,
    );
  }
  return calculationResponse.result;
}

const calculationsClient = {
  getCalculationsInfo,
};

export default calculationsClient;
