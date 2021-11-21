import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BookTabInfo } from '../../model/configurations/AppConfigurations';
import BookmarkScreen from '../../screens/bookmarks/BookmarkScreen';

const Stack = createStackNavigator();

interface Props {
  bookTabInfo: BookTabInfo;
}

const BookmarksStackNavigator: FC<Props> = ({ bookTabInfo }) => {
  return (
    <Stack.Navigator screenOptions={{ headerMode: 'float' }}>
      {bookTabInfo.bookTypes.length !== 1 && (
        <Stack.Screen
          name="BookmarkScreen"
          component={BookmarkScreen}
          options={{ header: () => null }}
        />
      )}
    </Stack.Navigator>
  );
};

export default BookmarksStackNavigator;
