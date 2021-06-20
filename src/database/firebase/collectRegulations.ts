import database from './database';
import { Article } from '../../model/Article';
import { AGGREGATE_REGULATIONS } from '../../model/Versioning';

async function getRegulations(): Promise<Article[]> {
  const querySnapshot = await database()
    .collection(AGGREGATE_REGULATIONS)
    .where('isDraft', '==', false)
    .get();
  return querySnapshot.docs.map(doc => doc.data() as Article);
}

const collectRegulations = {
  getRegulations,
};

export default collectRegulations;
