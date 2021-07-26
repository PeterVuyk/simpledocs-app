import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Header from '../header/Header';
import ArticleDetailsScreen from '../../screens/article/details/ArticleDetailsScreen';
import ArticleListScreen from '../../screens/article/list/ArticleListScreen';
import { FIRST_ARTICLE_TAB } from '../../model/ArticleType';
import ArticlesOverviewScreen from '../../screens/article/ArticlesOverviewScreen';
import { ArticlesInfo } from '../../model/ArticlesInfo';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
  articlesInfo: ArticlesInfo;
}

const FirstArticleTabStackNavigator: FC<Props> = ({
  navigation,
  articlesInfo,
}) => {
  return (
    <Stack.Navigator headerMode="screen">
      {articlesInfo.articleTypes.length !== 1 && (
        <Stack.Screen
          name="FirstArticleTabOverviewScreen"
          component={ArticlesOverviewScreen}
          initialParams={{
            articlesInfo,
            currentTab: FIRST_ARTICLE_TAB,
          }}
          options={{
            header: () => <Header navigation={navigation} />,
          }}
        />
      )}
      <Stack.Screen
        name={
          articlesInfo.articleTypes.length !== 1
            ? 'FirstArticleTabArticleScreen'
            : 'FirstArticleTabOverviewScreen'
        }
        component={ArticleListScreen}
        initialParams={{ articlesInfo, chapters: null, articleType: null }}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="FirstArticleTabIntermediateScreen"
        component={ArticleListScreen}
        initialParams={{ articlesInfo, chapters: null, articleType: null }}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="FirstArticleTabDetailsScreen"
        component={ArticleDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default FirstArticleTabStackNavigator;
