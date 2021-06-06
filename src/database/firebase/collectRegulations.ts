import database from './database';
import { Regulation } from '../repository/regulationRepository';

async function getRegulations(): Promise<Regulation[]> {
  const querySnapshot = await database()
    .collection('regulations')
    .where('isDraft', '==', false)
    .get();
  return querySnapshot.docs.map(doc => doc.data() as Regulation);
}

const collectRegulations = {
  getRegulations,
};

export default collectRegulations;
