import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import HeaderLogo from '../header/HeaderLogo';
import InfoScreen from '../../screens/InfoScreen';
import SearchButton from '../header/SearchButton';
import DrawerButton from '../header/DrawerButton';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}
const InfoStackNavigator: React.FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: null,
        headerStyle: { backgroundColor: '#fff', height: 120 },
        headerLeft: () => <DrawerButton navigation={navigation} />,
        headerRight: () => <SearchButton navigation={navigation} />,
        headerTitle: () => <HeaderLogo />,
      }}
    >
      <Stack.Screen name="InfoScreen" component={InfoScreen} />
    </Stack.Navigator>
  );
};

export default InfoStackNavigator;
