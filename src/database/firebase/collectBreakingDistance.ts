import database from './database';
import { BreakingDistanceInfo } from '../repository/breakingDistanceRepository';

async function getBreakingDistanceInfo(): Promise<BreakingDistanceInfo> {
  const querySnapshot = await database().collection('breakingDistance').get();
  return querySnapshot.docs.map(doc => doc.data() as BreakingDistanceInfo)[0];
}

const collectBreakingDistance = {
  getBreakingDistanceInfo,
};

export default collectBreakingDistance;
