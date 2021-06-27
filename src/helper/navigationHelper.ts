import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import {
  ARTICLE_TYPE_BRANCHE_RICHTLIJN_MEDISCHE_HULPVERLENING,
  ARTICLE_TYPE_INSTRUCTION_MANUAL,
  ARTICLE_TYPE_ONTHEFFING_GOEDE_TAAKUITVOERING,
  ARTICLE_TYPE_REGELING_OGS_2009,
  ARTICLE_TYPE_REGULATIONS,
  ARTICLE_TYPE_RVV_1990,
  ArticleType,
} from '../model/ArticleType';

export const BLANK_WEBPAGE = 'https://page-blank.firebaseapp.com/';

interface NavigationParams {
  articleChapter: string;
  articleType: ArticleType;
  searchText?: {
    chapter: string;
    searchText: string;
  };
}

const navigateToChapter = (
  navigationParams: NavigationParams,
  articleType: ArticleType,
  navigation: StackNavigationProp<any> | DrawerNavigationProp<any>,
): void => {
  if (
    articleType === ARTICLE_TYPE_RVV_1990 ||
    articleType === ARTICLE_TYPE_REGELING_OGS_2009 ||
    articleType === ARTICLE_TYPE_ONTHEFFING_GOEDE_TAAKUITVOERING ||
    articleType === ARTICLE_TYPE_BRANCHE_RICHTLIJN_MEDISCHE_HULPVERLENING
  ) {
    navigation.navigate('RegulationsScreenStack', {
      screen: 'RegulationDetailsScreen',
      params: navigationParams,
    });
    return;
  }
  if (articleType === ARTICLE_TYPE_INSTRUCTION_MANUAL) {
    navigation.navigate('InstructionManualStack', {
      screen: 'InstructionManualDetailsScreen',
      params: navigationParams,
    });
  }
};

const redirectToRegulations = (
  url: string,
  currentArticleType: ArticleType,
  targetArticleType: ArticleType,
  chapter: string,
  navigation: StackNavigationProp<any>,
): void => {
  if (currentArticleType === ARTICLE_TYPE_REGULATIONS) {
    navigation.push('RegulationDetailsScreen', {
      articleChapter: chapter,
      articleType: targetArticleType,
    });
    return;
  }
  navigation.navigate('RegulationsScreenStack', {
    screen: 'RegulationDetailsScreen',
    params: { articleChapter: chapter, articleType: targetArticleType },
  });
};

const redirectToInstructionManual = (
  url: string,
  currentArticleType: ArticleType,
  navigation: StackNavigationProp<any>,
): void => {
  const chapter = url.split(`${BLANK_WEBPAGE}instructionManual/`)[1] ?? '1';

  if (currentArticleType === ARTICLE_TYPE_INSTRUCTION_MANUAL) {
    navigation.push('InstructionManualDetailsScreen', {
      articleChapter: chapter,
      articleType: ARTICLE_TYPE_INSTRUCTION_MANUAL,
    });
    return;
  }
  navigation.navigate('InstructionManualStack', {
    screen: 'InstructionManualDetailsScreen',
    params: {
      articleChapter: chapter,
      articleType: ARTICLE_TYPE_INSTRUCTION_MANUAL,
    },
  });
};

const navigateFromHttpsUrlToChapter = (
  url: string,
  currentArticleType: ArticleType,
  navigation: StackNavigationProp<any>,
) => {
  if (url.search(`${BLANK_WEBPAGE}${ARTICLE_TYPE_RVV_1990}/`) !== -1) {
    redirectToRegulations(
      url,
      currentArticleType,
      url.split(`${BLANK_WEBPAGE}${ARTICLE_TYPE_RVV_1990}/`)[1] as ArticleType,
      ARTICLE_TYPE_RVV_1990,
      navigation,
    );
  }
  if (url.search(`${BLANK_WEBPAGE}${ARTICLE_TYPE_REGELING_OGS_2009}/`) !== -1) {
    redirectToRegulations(
      url,
      currentArticleType,
      url.split(
        `${BLANK_WEBPAGE}${ARTICLE_TYPE_REGELING_OGS_2009}/`,
      )[1] as ArticleType,
      ARTICLE_TYPE_REGELING_OGS_2009,
      navigation,
    );
  }
  if (
    url.search(
      `${BLANK_WEBPAGE}${ARTICLE_TYPE_ONTHEFFING_GOEDE_TAAKUITVOERING}/`,
    ) !== -1
  ) {
    redirectToRegulations(
      url,
      currentArticleType,
      url.split(
        `${BLANK_WEBPAGE}${ARTICLE_TYPE_ONTHEFFING_GOEDE_TAAKUITVOERING}/`,
      )[1] as ArticleType,
      ARTICLE_TYPE_ONTHEFFING_GOEDE_TAAKUITVOERING,
      navigation,
    );
  }
  if (
    url.search(
      `${BLANK_WEBPAGE}${ARTICLE_TYPE_BRANCHE_RICHTLIJN_MEDISCHE_HULPVERLENING}/`,
    ) !== -1
  ) {
    redirectToRegulations(
      url,
      currentArticleType,
      url.split(
        `${BLANK_WEBPAGE}${ARTICLE_TYPE_BRANCHE_RICHTLIJN_MEDISCHE_HULPVERLENING}/`,
      )[1] as ArticleType,
      ARTICLE_TYPE_BRANCHE_RICHTLIJN_MEDISCHE_HULPVERLENING,
      navigation,
    );
  }

  if (url.search(`${BLANK_WEBPAGE}instructionManual/`) !== -1) {
    redirectToInstructionManual(url, currentArticleType, navigation);
  }
};

const navigationHelper = {
  navigateToChapter,
  navigateFromHttpsUrlToChapter,
};

export default navigationHelper;
