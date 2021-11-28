import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookPageDetailsScreen from '../../screens/books/details/BookPageDetailsScreen';
import BookPageListScreen from '../../screens/books/list/BookPageListScreen';
import { FIRST_BOOK_TAB } from '../../model/BottomTab';
import BooksOverviewScreen from '../../screens/books/BooksOverviewScreen';
import { BookTabInfo } from '../../model/configurations/AppConfigurations';
import BookPageIntermediateListScreen from '../../screens/books/list/BookPageIntermediateListScreen';

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
            ? 'FirstBookTabPageScreen'
            : 'FirstBookTabOverviewScreen'
        }
        component={BookPageListScreen}
        initialParams={{
          bookTabInfo,
          chapters: null,
          bookType: null,
        }}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="FirstBookTabIntermediateScreen"
        component={BookPageIntermediateListScreen}
        initialParams={{
          bookTabInfo,
        }}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="FirstBookTabDetailsScreen"
        component={BookPageDetailsScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default FirstBookTabStackNavigator;
