import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Header from '../header/Header';
import ArticleDetailsScreen from '../../screens/article/details/ArticleDetailsScreen';
import ArticleListScreen from '../../screens/article/list/ArticleListScreen';
import { SECOND_ARTICLE_TAB } from '../../model/ArticleTab';
import ArticlesOverviewScreen from '../../screens/article/ArticlesOverviewScreen';
import { TabInfo } from '../../model/ConfigInfo';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
  tabInfo: TabInfo;
}

const SecondArticleTabStackNavigator: FC<Props> = ({ navigation, tabInfo }) => {
  return (
    <Stack.Navigator headerMode="screen">
      {tabInfo.articleTypes.length !== 1 && (
        <Stack.Screen
          name="SecondArticleTabOverviewScreen"
          component={ArticlesOverviewScreen}
          initialParams={{ tabInfo, currentTab: SECOND_ARTICLE_TAB }}
          options={{
            header: () => <Header navigation={navigation} />,
          }}
        />
      )}
      <Stack.Screen
        name={
          tabInfo.articleTypes.length !== 1
            ? 'SecondArticleTabArticleScreen'
            : 'SecondArticleTabOverviewScreen'
        }
        component={ArticleListScreen}
        initialParams={{
          tabInfo,
          chapters: null,
          articleType: null,
        }}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="SecondArticleTabIntermediateScreen"
        component={ArticleListScreen}
        initialParams={{
          tabInfo,
          chapters: null,
          articleType: null,
        }}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="SecondArticleTabDetailsScreen"
        component={ArticleDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SecondArticleTabStackNavigator;
