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

export interface ArticleTypesOrderedTranslated {
  articleType: string;
  translation: string;
  index: number;
}
const getArticleTypeTitlesTranslated = (): ArticleTypesOrderedTranslated[] => {
  return [
    { articleType: 'instructionManual', translation: 'Handboek', index: 0 },
    { articleType: 'RVV1990', translation: 'RVV 1990', index: 1 },
    {
      articleType: 'regelingOGS2009',
      translation: 'Regeling OGS 2009',
      index: 2,
    },
    {
      articleType: 'ontheffingGoedeTaakuitoefening',
      translation: 'Ontheffing goede taakuitoefening',
      index: 3,
    },
    {
      articleType: 'brancherichtlijnMedischeHulpverlening',
      translation: 'Brancherichtlijn medische hulpverlening',
      index: 4,
    },
  ];
};

const articleTypeHelper = {
  getTabByArticleType,
  getArticleTypesByTab,
  getArticles,
  getArticleTypeTitlesTranslated,
};

export default articleTypeHelper;
