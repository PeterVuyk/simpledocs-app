import database from './database';
import { Article } from '../../model/Article';

async function getArticles(articleType: string): Promise<Article[]> {
  const querySnapshot = await database()
    .collection(articleType)
    .where('isDraft', '==', false)
    .get();
  return querySnapshot.docs.map(doc => doc.data() as Article);
}

const collectArticlesByType = {
  getArticles,
};

export default collectArticlesByType;
