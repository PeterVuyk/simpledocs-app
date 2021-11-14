import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Header from '../header/Header';
import ArticleDetailsScreen from '../../screens/article/details/ArticleDetailsScreen';
import ArticleListScreen from '../../screens/article/list/ArticleListScreen';
import { SECOND_BOOK_TAB } from '../../model/BookTab';
import BooksOverviewScreen from '../../screens/article/BooksOverviewScreen';
import { BookTabInfo } from '../../model/AppConfigurations';
import ArticleIntermediateListScreen from '../../screens/article/list/ArticleIntermediateListScreen';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
  bookTabInfo: BookTabInfo;
}

const SecondBookTabStackNavigator: FC<Props> = ({
  navigation,
  bookTabInfo,
}) => {
  return (
    <Stack.Navigator screenOptions={{ headerMode: 'screen' }}>
      {bookTabInfo.bookTypes.length !== 1 && (
        <Stack.Screen
          name="SecondBookTabOverviewScreen"
          component={BooksOverviewScreen}
          initialParams={{
            bookTabInfo,
            currentTab: SECOND_BOOK_TAB,
          }}
          options={{
            header: () => <Header navigation={navigation} />,
          }}
        />
      )}
      <Stack.Screen
        name={
          bookTabInfo.bookTypes.length !== 1
            ? 'SecondBookTabArticleScreen'
            : 'SecondBookTabOverviewScreen'
        }
        component={ArticleListScreen}
        initialParams={{
          bookTabInfo,
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
          bookTabInfo,
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
