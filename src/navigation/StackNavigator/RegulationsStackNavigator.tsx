import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import HeaderLogo from '../header/HeaderLogo';
import RegulationsScreen from '../../screens/RegulationsScreen';
import DocumentationViewScreen from '../../screens/DocumentationViewScreen';
import DrawerButton from '../header/DrawerButton';
import SearchButton from '../header/SearchButton';
import SearchScreen from '../../screens/SearchScreen';
import AppSearchBar from '../header/AppSearchBar';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const RegulationStackNavigator: React.FC<Props> = ({ navigation }) => {
  const [searchText, setSearchText] = React.useState<string>('');

  const handleSearchTextChange = (searchedText: string): void =>
    setSearchText(searchedText);

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
      <Stack.Screen name="RegulationScreen" component={RegulationsScreen} />
      <Stack.Screen
        name="DocumentationViewScreen"
        component={DocumentationViewScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: () => (
            <AppSearchBar
              searchText={searchText}
              handleSearchTextChange={handleSearchTextChange}
            />
          ),
          headerLeft: () => null,
          headerRight: () => null,
        }}
        name="SearchScreen"
      >
        {() => <SearchScreen searchText={searchText} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default RegulationStackNavigator;
