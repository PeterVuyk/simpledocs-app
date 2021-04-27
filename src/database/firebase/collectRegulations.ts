import database from './database';
import { Regulation } from '../repository/regulationRepository';

export interface Versioning {
  regulations: string;
}

async function getRegulations(): Promise<Regulation[]> {
  const querySnapshot = await database().collection('regulations').get();
  return querySnapshot.docs.map(doc => doc.data() as Regulation);
}

const collectRegulations = {
  getRegulations,
};

export default collectRegulations;
