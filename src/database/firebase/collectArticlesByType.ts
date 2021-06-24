import database from './database';
import { Article } from '../../model/Article';
import { ArticleType } from '../../model/ArticleType';

async function getArticles(articleType: ArticleType): Promise<Article[]> {
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
