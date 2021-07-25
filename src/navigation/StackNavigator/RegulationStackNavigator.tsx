import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Header from '../header/Header';
import ArticleDetailsScreen from '../../screens/article/ArticleDetailsScreen';
import { ArticlesInfo } from '../../helper/articleTypeHelper';
import ArticleListScreen from '../../screens/article/ArticleListScreen';
import { ARTICLE_TAB_REGULATIONS } from '../../model/ArticleType';
import ArticlesOverviewScreen from '../../screens/article/ArticlesOverviewScreen';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
  articlesInfo: ArticlesInfo;
}

const RegulationStackNavigator: FC<Props> = ({ navigation, articlesInfo }) => {
  return (
    <Stack.Navigator headerMode="screen">
      {articlesInfo.articleTypes.length !== 1 && (
        <Stack.Screen
          name="RegulationOverviewScreen"
          component={ArticlesOverviewScreen}
          initialParams={{ articlesInfo, currentTab: ARTICLE_TAB_REGULATIONS }}
          options={{
            header: () => <Header navigation={navigation} />,
          }}
        />
      )}
      <Stack.Screen
        name={
          articlesInfo.articleTypes.length !== 1
            ? 'RegulationsScreen'
            : 'RegulationOverviewScreen'
        }
        component={ArticleListScreen}
        initialParams={{ articlesInfo, chapters: null, articleType: null }}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="RegulationsIntermediateScreen"
        component={ArticleListScreen}
        initialParams={{ articlesInfo, chapters: null, articleType: null }}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="RegulationDetailsScreen"
        component={ArticleDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RegulationStackNavigator;
