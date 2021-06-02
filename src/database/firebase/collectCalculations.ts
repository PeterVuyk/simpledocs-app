import database from './database';
import { CalculationInfo } from '../repository/calculationsRepository';

async function getCalculationsInfo(): Promise<CalculationInfo[]> {
  const querySnapshot = await database().collection('calculations').get();
  return querySnapshot.docs.map(doc => doc.data() as CalculationInfo);
}

const collectCalculations = {
  getCalculationsInfo,
};

export default collectCalculations;