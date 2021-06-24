import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import {
  ARTICLE_TYPE_INSTRUCTION_MANUAL,
  ARTICLE_TYPE_REGULATIONS,
  ArticleType,
} from '../model/ArticleType';

export const BLANK_WEBPAGE = 'https://page-blank.firebaseapp.com/';

interface NavigationParams {
  articleChapter: string;
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
  if (articleType === ARTICLE_TYPE_REGULATIONS) {
    navigation.navigate('RegulationsScreenStack', {
      screen: 'RegulationDetailsScreen',
      params: navigationParams,
    });
    return;
  }
  navigation.navigate('InstructionManualStack', {
    screen: 'InstructionManualDetailsScreen',
    params: navigationParams,
  });
};

const redirectToRegulations = (
  url: string,
  currentArticleType: ArticleType,
  navigation: StackNavigationProp<any>,
): void => {
  const chapter = url.split(`${BLANK_WEBPAGE}regulations/`)[1] ?? '1';

  if (currentArticleType === ARTICLE_TYPE_REGULATIONS) {
    navigation.push('RegulationDetailsScreen', {
      articleChapter: chapter,
    });
    return;
  }
  navigation.navigate('RegulationsScreenStack', {
    screen: 'RegulationDetailsScreen',
    params: { articleChapter: chapter },
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
    });
    return;
  }
  navigation.navigate('InstructionManualStack', {
    screen: 'InstructionManualDetailsScreen',
    params: { articleChapter: chapter },
  });
};

const navigateFromHttpsUrlToChapter = (
  url: string,
  currentArticleType: ArticleType,
  navigation: StackNavigationProp<any>,
) => {
  if (url.search(`${BLANK_WEBPAGE}regulations/`) !== -1) {
    redirectToRegulations(url, currentArticleType, navigation);
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
