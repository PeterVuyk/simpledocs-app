import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ArticleDetailsScreen from '../../screens/article/details/ArticleDetailsScreen';
import ArticleListScreen from '../../screens/article/list/ArticleListScreen';
import { FIRST_BOOK_TAB } from '../../model/BottomTab';
import BooksOverviewScreen from '../../screens/article/BooksOverviewScreen';
import { BookTabInfo } from '../../model/configurations/AppConfigurations';
import ArticleIntermediateListScreen from '../../screens/article/list/ArticleIntermediateListScreen';

const Stack = createStackNavigator();

interface Props {
  bookTabInfo: BookTabInfo;
}

const FirstBookTabStackNavigator: FC<Props> = ({ bookTabInfo }) => {
  return (
    <Stack.Navigator screenOptions={{ headerMode: 'float' }}>
      {bookTabInfo.bookTypes.length !== 1 && (
        <Stack.Screen
          name="FirstBookTabOverviewScreen"
          component={BooksOverviewScreen}
          initialParams={{
            bookTabInfo,
            currentTab: FIRST_BOOK_TAB,
          }}
          options={{ header: () => null }}
        />
      )}
      <Stack.Screen
        name={
          bookTabInfo.bookTypes.length !== 1
            ? 'FirstBookTabArticleScreen'
            : 'FirstBookTabOverviewScreen'
        }
        component={ArticleListScreen}
        initialParams={{
          bookTabInfo,
          chapters: null,
          bookType: null,
        }}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="FirstBookTabIntermediateScreen"
        component={ArticleIntermediateListScreen}
        initialParams={{
          bookTabInfo,
        }}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="FirstBookTabDetailsScreen"
        component={ArticleDetailsScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default FirstBookTabStackNavigator;
