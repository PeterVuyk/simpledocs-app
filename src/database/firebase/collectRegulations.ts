import database from './database';
import { Article } from '../model/Article';

async function getRegulations(): Promise<Article[]> {
  const querySnapshot = await database()
    .collection('regulations')
    .where('isDraft', '==', false)
    .get();
  return querySnapshot.docs.map(doc => doc.data() as Article);
}

const collectRegulations = {
  getRegulations,
};

export default collectRegulations;
