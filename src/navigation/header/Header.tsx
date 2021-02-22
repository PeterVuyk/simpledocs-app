import React, { ReactElement } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { View } from 'react-native';
import LogoHeader from './LogoHeader';
import SearchScreen from '../../screens/SearchScreen';
import AppSearchBar from './AppSearchBar';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
  children: ReactElement;
}

const Header: React.FC<Props> = ({ navigation, children }) => {
  const [searchIsActive, setSearchIsActive] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const isFocused = useIsFocused();

  React.useEffect(() => {
    setSearchIsActive(false);
    setSearchText('');
  }, [isFocused]);

  const handleSearchTextChange = (searchedText: string): void =>
    setSearchText(searchedText);

  const handleSearchIsActiveChange = (isActive: boolean): void =>
    setSearchIsActive(isActive);

  const showSearchInHeader = (): boolean => searchIsActive || searchText !== '';

  const getScreen = (): ReactElement => {
    if (searchIsActive || searchText !== '') {
      return <SearchScreen searchText={searchText} />;
    }
    return children;
  };

  const getSearchButton = (): ReactElement => {
    return (
      <MaterialCommunityIcons
        style={{ marginRight: 10, marginTop: 10 }}
        name="magnify"
        color="#154594"
        size={26}
        onPress={() => setSearchIsActive(true)}
      />
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: null,
        headerStyle: { backgroundColor: '#fff', height: 120 },
        headerLeft: () =>
          showSearchInHeader() ? (
            () => null
          ) : (
            <MaterialCommunityIcons
              style={{ marginLeft: 10, marginTop: 10 }}
              name="menu"
              color="#154594"
              size={26}
              onPress={() => navigation.openDrawer()}
            />
          ),
        headerRight: () =>
          showSearchInHeader() ? () => null : getSearchButton(),
      }}
    >
      <Stack.Screen
        name="Ambulancezorg Nederland"
        options={() =>
          showSearchInHeader()
            ? {
                header: () => (
                  <AppSearchBar
                    handleSearchTextChange={handleSearchTextChange}
                    handleSearchIsActiveChange={handleSearchIsActiveChange}
                    searchText={searchText}
                  />
                ),
              }
            : { headerTitle: () => <LogoHeader /> }
        }
      >
        {() => <View style={{ flex: 1 }}>{getScreen()}</View>}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Header;
