import React, { ReactElement } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import RegulationsScreen from '../../screens/RegulationsScreen';
import LogoHeader from './LogoHeader';
import SearchScreen from '../../screens/SearchScreen';
import InfoScreen from '../../screens/InfoScreen';
import DecisionTreeScreen from '../../screens/DecisionTreeScreen';
import AppSearchBar from './AppSearchBar';
import DismissKeyboard from '../../components/DismissKeyboard';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
  route: RouteProp<{ params: { screenName: string } }, 'params'>;
}

const Header: React.FC<Props> = ({ navigation, route }) => {
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

  const getScreen = (): ReactElement => {
    if (searchIsActive || searchText !== '') {
      return <SearchScreen searchText={searchText} />;
    }

    switch (route.params.screenName) {
      case 'Regulations':
        return <RegulationsScreen />;
      case 'Info':
        return <InfoScreen />;
      case 'DecisionTree':
        return <DecisionTreeScreen />;
      default:
        return <SearchScreen searchText={searchText} />;
    }
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
          searchIsActive ? (
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
        headerRight: () => (searchIsActive ? () => null : getSearchButton()),
      }}
    >
      <Stack.Screen
        name="Ambulancezorg Nederland"
        options={() =>
          searchIsActive
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
        {() => <DismissKeyboard>{getScreen()}</DismissKeyboard>}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Header;
