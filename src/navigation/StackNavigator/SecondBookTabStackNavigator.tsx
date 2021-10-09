import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Header from '../header/Header';
import ArticleDetailsScreen from '../../screens/article/details/ArticleDetailsScreen';
import ArticleListScreen from '../../screens/article/list/ArticleListScreen';
import { SECOND_BOOK_TAB } from '../../model/BookTab';
import BooksOverviewScreen from '../../screens/article/BooksOverviewScreen';
import { TabInfo } from '../../model/AppConfigurations';
import ArticleIntermediateListScreen from '../../screens/article/list/ArticleIntermediateListScreen';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
  tabInfo: TabInfo;
}

const SecondBookTabStackNavigator: FC<Props> = ({ navigation, tabInfo }) => {
  return (
    <Stack.Navigator headerMode="screen">
      {tabInfo.bookTypes.length !== 1 && (
        <Stack.Screen
          name="SecondBookTabOverviewScreen"
          component={BooksOverviewScreen}
          initialParams={{ tabInfo, currentTab: SECOND_BOOK_TAB }}
          options={{
            header: () => <Header navigation={navigation} />,
          }}
        />
      )}
      <Stack.Screen
        name={
          tabInfo.bookTypes.length !== 1
            ? 'SecondBookTabArticleScreen'
            : 'SecondBookTabOverviewScreen'
        }
        component={ArticleListScreen}
        initialParams={{
          tabInfo,
          chapters: null,
          bookType: null,
        }}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="SecondBookTabIntermediateScreen"
        component={ArticleIntermediateListScreen}
        initialParams={{
          tabInfo,
        }}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="SecondBookTabDetailsScreen"
        component={ArticleDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SecondBookTabStackNavigator;
