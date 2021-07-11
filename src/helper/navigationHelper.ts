import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import articleTypeHelper from './articleTypeHelper';
import {
  ARTICLE_TAB_INSTRUCTION_MANUAL,
  ARTICLE_TAB_REGULATIONS,
  ARTICLE_TYPE_INSTRUCTION_MANUAL,
} from '../model/ArticleType';

export const BLANK_WEBPAGE = 'https://page-blank.firebaseapp.com/';

interface NavigationParams {
  articleChapter: string;
  articleType: string;
  searchText?: {
    chapter: string;
    searchText: string;
  };
}

const navigateToChapter = (
  navigationParams: NavigationParams,
  articleType: string,
  navigation: StackNavigationProp<any> | DrawerNavigationProp<any>,
): void => {
  const currentTab = articleTypeHelper.getTabByArticleType(articleType);
  if (currentTab === ARTICLE_TAB_REGULATIONS) {
    navigation.navigate('RegulationsScreenStack', {
      screen: 'RegulationDetailsScreen',
      params: navigationParams,
    });
    return;
  }
  if (currentTab === ARTICLE_TAB_INSTRUCTION_MANUAL) {
    navigation.navigate('InstructionManualStack', {
      screen: 'InstructionManualDetailsScreen',
      params: navigationParams,
    });
  }
};

const redirect = (
  currentArticleType: string,
  targetArticleType: string,
  chapter: string,
  navigation: StackNavigationProp<any>,
): void => {
  const currentTab = articleTypeHelper.getTabByArticleType(currentArticleType);
  const targetTab = articleTypeHelper.getTabByArticleType(targetArticleType);
  if (targetTab === ARTICLE_TAB_REGULATIONS) {
    if (currentTab === ARTICLE_TAB_REGULATIONS) {
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
  }
  if (targetTab === ARTICLE_TYPE_INSTRUCTION_MANUAL) {
    if (currentTab === ARTICLE_TYPE_INSTRUCTION_MANUAL) {
      navigation.push('InstructionManualDetailsScreen', {
        articleChapter: chapter,
        articleType: targetArticleType,
      });
      return;
    }
    navigation.navigate('InstructionManualStack', {
      screen: 'InstructionManualDetailsScreen',
      params: { articleChapter: chapter, articleType: targetArticleType },
    });
  }
};

// returns the articleTYpe
const getArticleTypeFromUrl = (url: string): string | null => {
  const path = url.split(BLANK_WEBPAGE, 1);
  if (path.length === 0) {
    return null;
  }
  path[1].split('/', 1);
  return path.length === 0 ? null : path[0];
};

const getChapterFromUrl = (url: string): string | null => {
  const path = url.split('/');
  if (path.length < 3) {
    return null;
  }
  return path[path.length - 1];
};

const navigateFromHttpsUrlToChapter = (
  url: string,
  currentArticleType: string,
  navigation: StackNavigationProp<any>,
) => {
  const articleType = getArticleTypeFromUrl(url);
  const chapter = getChapterFromUrl(url);
  if (articleType === null || chapter === null) {
    // TODO: Logger dat er geen articleType / chapter beschikbaar is.
    return;
  }
  redirect(currentArticleType, articleType, chapter, navigation);
};

const navigationHelper = {
  navigateToChapter,
  navigateFromHttpsUrlToChapter,
};

export default navigationHelper;
