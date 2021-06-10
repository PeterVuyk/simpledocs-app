import database from './database';
import { Article } from '../entity/Article';

async function getInstructionManual(): Promise<Article[]> {
  const querySnapshot = await database()
    .collection('instructionManual')
    .where('isDraft', '==', false)
    .get();
  return querySnapshot.docs.map(doc => doc.data() as Article);
}

const collectRegulations = {
  getInstructionManual,
};

export default collectRegulations;
