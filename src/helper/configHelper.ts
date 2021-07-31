import { FIRST_ARTICLE_TAB, SECOND_ARTICLE_TAB } from '../model/ArticleTab';
import { ArticleInfo } from '../model/ConfigInfo';
import appConfigDAO from '../fileSystem/appConfigDAO';

const getArticleTypes = async (): Promise<ArticleInfo[]> => {
  const appConfig = await appConfigDAO.getAppConfig();
  const articleTypesFirsTab = appConfig.firstTab.articleTypes.sort(
    (a, b) => a.index - b.index,
  );
  const articleTypesSecondTab = appConfig.secondTab.articleTypes.sort(
    (a, b) => a.index - b.index,
  );
  return [...articleTypesFirsTab, ...articleTypesSecondTab];
};

const getConfigByArticleType = async (
  articleType: string,
): Promise<ArticleInfo | undefined> => {
  const articleTypes = await getArticleTypes();
  return articleTypes.find(value => value.articleType === articleType);
};

const getTabByArticleType = async (
  articleType: string,
): Promise<string | null> => {
  const appConfig = await appConfigDAO.getAppConfig();
  if (
    appConfig.firstTab.articleTypes.find(
      value => value.articleType === articleType,
    )
  ) {
    return FIRST_ARTICLE_TAB;
  }
  if (
    appConfig.secondTab.articleTypes.find(
      value => value.articleType === articleType,
    )
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
