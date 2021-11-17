import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ArticleDetailsScreen from '../../screens/article/details/ArticleDetailsScreen';
import ArticleListScreen from '../../screens/article/list/ArticleListScreen';
import { SECOND_BOOK_TAB } from '../../model/BottomTab';
import BooksOverviewScreen from '../../screens/article/BooksOverviewScreen';
import { BookTabInfo } from '../../model/configurations/AppConfigurations';
import ArticleIntermediateListScreen from '../../screens/article/list/ArticleIntermediateListScreen';

const Stack = createStackNavigator();

interface Props {
  bookTabInfo: BookTabInfo;
}

const SecondBookTabStackNavigator: FC<Props> = ({ bookTabInfo }) => {
  return (
    <Stack.Navigator screenOptions={{ headerMode: 'float' }}>
      {bookTabInfo.bookTypes.length !== 1 && (
        <Stack.Screen
          name="SecondBookTabOverviewScreen"
          component={BooksOverviewScreen}
          initialParams={{
            bookTabInfo,
            currentTab: SECOND_BOOK_TAB,
          }}
          options={{ header: () => null }}
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
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="SecondBookTabIntermediateScreen"
        component={ArticleIntermediateListScreen}
        initialParams={{
          bookTabInfo,
        }}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="SecondBookTabDetailsScreen"
        component={ArticleDetailsScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default SecondBookTabStackNavigator;
