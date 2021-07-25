import {
  ARTICLE_TAB_INSTRUCTION_MANUAL,
  ARTICLE_TAB_REGULATIONS,
  ARTICLE_TYPE_INSTRUCTION_MANUAL,
} from '../model/ArticleType';
import { IconFamilyType } from '../model/IconFamilyType';

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

export interface BottomTab {
  familyType: IconFamilyType;
  icon: string;
  title: string;
}

export interface ArticleInfo {
  index: number;
  articleType: string;
  title?: string;
  subTitle?: string;
  iconFile?: string;
}
export interface ArticlesInfo {
  title?: string;
  subTitle?: string;
  articleTypes: ArticleInfo[];
  bottomTab: BottomTab;
}

// eslint-disable-next-line @typescript-eslint/ban-types
const getArticlesInfoByTab = (articleTab: string): ArticlesInfo => {
  if (articleTab === ARTICLE_TAB_REGULATIONS) {
    return {
      bottomTab: {
        familyType: 'MaterialCommunityIcons',
        icon: 'book-open-outline',
        title: 'Regelgeving',
      },
      title: 'Regelgevingen',
      subTitle:
        'Hieronder zie je een viertal opties met bla die we regelgevingen noemen, todo eddie graag mij doorgeven welke tekst je hier zou willen hebben staan.',
      articleTypes: [
        {
          index: 0,
          articleType: 'ontheffingGoedeTaakuitoefening',
          title: 'Ontheffing goede taakuitoefening',
          subTitle: 'Over bla en bla',
          iconFile:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjNTZhYWZmIiBkPSJNMjgsNUg0QTMsMywwLDAsMCwxLDhWMjNhMSwxLDAsMCwwLDEuNzQuNjdsOC4xNS05LjA4LDUuNiw4LjA5YTEsMSwwLDAsMCwxLjQzLjIybDYtNC41OSw1LjM4LDUuNDdBMSwxLDAsMCwwLDMxLDIzLjFWOEEzLDMsMCwwLDAsMjgsNVoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMzAuNzEsMjIuNGwtNi02LjFhMSwxLDAsMCwwLTEuMzItLjA5bC02LjY4LDUuMTNhMSwxLDAsMCwwLS4yMSwxLjM2bDIuNjgsMy44N0ExLDEsMCwwLDAsMjAsMjdoOGEzLDMsMCwwLDAsMy0zdi0uOUExLDEsMCwwLDAsMzAuNzEsMjIuNFoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMjAuODIsMjUuNDNsLTktMTNhMSwxLDAsMCwwLTEuNTctLjFsLTksMTBBMSwxLDAsMCwwLDEsMjN2MWEzLDMsMCwwLDAsMywzSDIwYTEsMSwwLDAsMCwuODItMS41N1oiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjEyIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+',
        },
        {
          index: 1,
          articleType: 'brancherichtlijnMedischeHulpverlening',
          title: 'Brancherichtlijn medische hulpverlening',
          subTitle: 'Over bla die bla',
          iconFile:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjNTZhYWZmIiBkPSJNMjgsNUg0QTMsMywwLDAsMCwxLDhWMjNhMSwxLDAsMCwwLDEuNzQuNjdsOC4xNS05LjA4LDUuNiw4LjA5YTEsMSwwLDAsMCwxLjQzLjIybDYtNC41OSw1LjM4LDUuNDdBMSwxLDAsMCwwLDMxLDIzLjFWOEEzLDMsMCwwLDAsMjgsNVoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMzAuNzEsMjIuNGwtNi02LjFhMSwxLDAsMCwwLTEuMzItLjA5bC02LjY4LDUuMTNhMSwxLDAsMCwwLS4yMSwxLjM2bDIuNjgsMy44N0ExLDEsMCwwLDAsMjAsMjdoOGEzLDMsMCwwLDAsMy0zdi0uOUExLDEsMCwwLDAsMzAuNzEsMjIuNFoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMjAuODIsMjUuNDNsLTktMTNhMSwxLDAsMCwwLTEuNTctLjFsLTksMTBBMSwxLDAsMCwwLDEsMjN2MWEzLDMsMCwwLDAsMywzSDIwYTEsMSwwLDAsMCwuODItMS41N1oiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjEyIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+',
        },
        {
          index: 2,
          articleType: 'regelingOGS2009',
          title: 'Regeling OGS 2009',
          subTitle: 'Over bla die bla',
          iconFile:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjNTZhYWZmIiBkPSJNMjgsNUg0QTMsMywwLDAsMCwxLDhWMjNhMSwxLDAsMCwwLDEuNzQuNjdsOC4xNS05LjA4LDUuNiw4LjA5YTEsMSwwLDAsMCwxLjQzLjIybDYtNC41OSw1LjM4LDUuNDdBMSwxLDAsMCwwLDMxLDIzLjFWOEEzLDMsMCwwLDAsMjgsNVoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMzAuNzEsMjIuNGwtNi02LjFhMSwxLDAsMCwwLTEuMzItLjA5bC02LjY4LDUuMTNhMSwxLDAsMCwwLS4yMSwxLjM2bDIuNjgsMy44N0ExLDEsMCwwLDAsMjAsMjdoOGEzLDMsMCwwLDAsMy0zdi0uOUExLDEsMCwwLDAsMzAuNzEsMjIuNFoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMjAuODIsMjUuNDNsLTktMTNhMSwxLDAsMCwwLTEuNTctLjFsLTksMTBBMSwxLDAsMCwwLDEsMjN2MWEzLDMsMCwwLDAsMywzSDIwYTEsMSwwLDAsMCwuODItMS41N1oiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjEyIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+',
        },
        {
          index: 3,
          articleType: 'RVV1990',
          title: 'RVV 1990',
          subTitle: 'Ja bla die bla',
          iconFile:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjNTZhYWZmIiBkPSJNMjgsNUg0QTMsMywwLDAsMCwxLDhWMjNhMSwxLDAsMCwwLDEuNzQuNjdsOC4xNS05LjA4LDUuNiw4LjA5YTEsMSwwLDAsMCwxLjQzLjIybDYtNC41OSw1LjM4LDUuNDdBMSwxLDAsMCwwLDMxLDIzLjFWOEEzLDMsMCwwLDAsMjgsNVoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMzAuNzEsMjIuNGwtNi02LjFhMSwxLDAsMCwwLTEuMzItLjA5bC02LjY4LDUuMTNhMSwxLDAsMCwwLS4yMSwxLjM2bDIuNjgsMy44N0ExLDEsMCwwLDAsMjAsMjdoOGEzLDMsMCwwLDAsMy0zdi0uOUExLDEsMCwwLDAsMzAuNzEsMjIuNFoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMjAuODIsMjUuNDNsLTktMTNhMSwxLDAsMCwwLTEuNTctLjFsLTksMTBBMSwxLDAsMCwwLDEsMjN2MWEzLDMsMCwwLDAsMywzSDIwYTEsMSwwLDAsMCwuODItMS41N1oiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjEyIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+',
        },
      ],
    };
  }
  return {
    articleTypes: [{ articleType: 'instructionManual', index: 0 }],
    bottomTab: {
      familyType: 'SimpleLineIcons',
      icon: 'graduation',
      title: 'Handboek',
    },
  };
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
  getArticlesInfoByTab,
};

export default articleTypeHelper;
