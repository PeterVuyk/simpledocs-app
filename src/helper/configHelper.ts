import { FIRST_ARTICLE_TAB, SECOND_ARTICLE_TAB } from '../model/ArticleTab';
import { ArticleInfo } from '../model/ConfigInfo';
import configDAO from '../fileSystem/configDAO';

const getArticleTypes = (): ArticleInfo[] => {
  const articleTypesFirsTab = configDAO
    .getConfig()
    .firstTab.articleTypes.sort((a, b) => a.index - b.index);
  const articleTypesSecondTab = configDAO
    .getConfig()
    .secondTab.articleTypes.sort((a, b) => a.index - b.index);
  return [...articleTypesFirsTab, ...articleTypesSecondTab];
};

const getTabByArticleType = (articleType: string): string | null => {
  if (
    configDAO
      .getConfig()
      .firstTab.articleTypes.find(value => value.articleType === articleType)
  ) {
    return FIRST_ARTICLE_TAB;
  }
  if (
    configDAO
      .getConfig()
      .secondTab.articleTypes.find(value => value.articleType === articleType)
  ) {
    return SECOND_ARTICLE_TAB;
  }
  return null;
};

const configHelper = {
  getTabByArticleType,
  getArticleTypes,
};

export default configHelper;
