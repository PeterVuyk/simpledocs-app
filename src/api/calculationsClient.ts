import Constants from 'expo-constants';
import { CalculationResponse } from '../model/ApiResponse';
import { CalculationInfo } from '../model/CalculationInfo';
import Firebase from '../authentication/firebase';

async function getCalculationsInfo(): Promise<CalculationInfo[]> {
  const response = await Firebase.functions(process.env.FIREBASE_REGION)
    .httpsCallable('getCalculations')({
      appVersion: Constants.manifest?.version,
    })
    .then(value => value.data as CalculationResponse);
  if (!response.success) {
    throw new Error(
      `Failed collecting calculations from server, message server: ${response.message}`,
    );
  }
  return response.result!;
}

const calculationsClient = {
  getCalculationsInfo,
};

export default calculationsClient;
