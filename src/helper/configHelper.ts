import { FIRST_ARTICLE_TAB, SECOND_ARTICLE_TAB } from '../model/ArticleTab';
import { ArticleInfo } from '../model/ConfigInfo';
import appConfigDAO from '../fileSystem/appConfigDAO';

const getArticleTypes = (): ArticleInfo[] => {
  const articleTypesFirsTab = appConfigDAO
    .getAppConfig()
    .firstTab.articleTypes.sort((a, b) => a.index - b.index);
  const articleTypesSecondTab = appConfigDAO
    .getAppConfig()
    .secondTab.articleTypes.sort((a, b) => a.index - b.index);
  return [...articleTypesFirsTab, ...articleTypesSecondTab];
};

const getConfigByArticleType = (
  articleType: string,
): ArticleInfo | undefined => {
  return getArticleTypes().find(value => value.articleType === articleType);
};

const getTabByArticleType = (articleType: string): string | null => {
  if (
    appConfigDAO
      .getAppConfig()
      .firstTab.articleTypes.find(value => value.articleType === articleType)
  ) {
    return FIRST_ARTICLE_TAB;
  }
  if (
    appConfigDAO
      .getAppConfig()
      .secondTab.articleTypes.find(value => value.articleType === articleType)
  ) {
    return SECOND_ARTICLE_TAB;
  }
  return null;
};

const configHelper = {
  getTabByArticleType,
  getArticleTypes,
  getConfigByArticleType,
};

export default configHelper;
