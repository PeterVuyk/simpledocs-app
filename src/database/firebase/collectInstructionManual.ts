import database from './database';
import { Article } from '../../model/Article';
import { ARTICLE_TYPE_INSTRUCTION_MANUAL } from '../../model/ArticleType';

async function getInstructionManual(): Promise<Article[]> {
  const querySnapshot = await database()
    .collection(ARTICLE_TYPE_INSTRUCTION_MANUAL)
    .where('isDraft', '==', false)
    .get();
  return querySnapshot.docs.map(doc => doc.data() as Article);
}

const collectInstructionManual = {
  getInstructionManual,
};

export default collectInstructionManual;
