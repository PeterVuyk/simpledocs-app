import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import HeaderLogo from '../header/HeaderLogo';
import DecisionTreeScreen from '../../screens/DecisionTreeScreen';
import DrawerButton from '../header/DrawerButton';
import SearchButton from '../header/SearchButton';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const DecisionTreeStackNavigator: React.FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: null,
        headerStyle: { backgroundColor: '#fff', height: 125 },
        headerLeft: () => <DrawerButton navigation={navigation} />,
        headerRight: () => <SearchButton navigation={navigation} />,
        headerTitle: () => <HeaderLogo />,
      }}
    >
      <Stack.Screen name="DecisionTreeScreen" component={DecisionTreeScreen} />
    </Stack.Navigator>
  );
};

export default DecisionTreeStackNavigator;
