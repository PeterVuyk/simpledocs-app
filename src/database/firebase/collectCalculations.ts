import database from './database';
import { CalculationInfo } from '../../model/CalculationInfo';
import { AGGREGATE_CALCULATIONS } from '../../model/Versioning';

async function getCalculationsInfo(): Promise<CalculationInfo[]> {
  const querySnapshot = await database()
    .collection(AGGREGATE_CALCULATIONS)
    .get();
  return querySnapshot.docs.map(doc => doc.data() as CalculationInfo);
}

const collectCalculations = {
  getCalculationsInfo,
};

export default collectCalculations;
