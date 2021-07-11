import {
  ARTICLE_TAB_INSTRUCTION_MANUAL,
  ARTICLE_TAB_REGULATIONS,
  ARTICLE_TYPE_INSTRUCTION_MANUAL,
} from '../model/ArticleType';

const getTabByArticleType = (articleType: string): string | null => {
  if (
    articleType === 'ontheffingGoedeTaakuitoefening' ||
    articleType === 'brancherichtlijnMedischeHulpverlening' ||
    articleType === 'regelingOGS2009' ||
    articleType === 'RVV1990'
  ) {
    return ARTICLE_TAB_REGULATIONS;
  }
  if (articleType === ARTICLE_TYPE_INSTRUCTION_MANUAL) {
    return ARTICLE_TAB_INSTRUCTION_MANUAL;
  }
  return null;
};

const getArticleTypesByTab = (tab: string): string[] => {
  if (tab === ARTICLE_TAB_REGULATIONS) {
    return [
      'ontheffingGoedeTaakuitoefening',
      'brancherichtlijnMedischeHulpverlening',
      'regelingOGS2009',
      'RVV1990',
    ];
  }
  if (tab === ARTICLE_TAB_INSTRUCTION_MANUAL) {
    return [ARTICLE_TYPE_INSTRUCTION_MANUAL];
  }
  return [];
};

const getArticles = () => {
  return [
    'ontheffingGoedeTaakuitoefening',
    'brancherichtlijnMedischeHulpverlening',
    'regelingOGS2009',
    'RVV1990',
    ARTICLE_TYPE_INSTRUCTION_MANUAL,
  ];
};

const articleTypeHelper = {
  getTabByArticleType,
  getArticleTypesByTab,
  getArticles,
};

export default articleTypeHelper;
