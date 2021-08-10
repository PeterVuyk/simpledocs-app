import database from './database';
import { Article } from '../../model/Article';

async function getArticles(bookType: string): Promise<Article[]> {
  const querySnapshot = await database()
    .collection(bookType)
    .where('isDraft', '==', false)
    .get();
  return querySnapshot.docs.map(doc => doc.data() as Article);
}

const collectArticlesByType = {
  getArticles,
};

export default collectArticlesByType;
