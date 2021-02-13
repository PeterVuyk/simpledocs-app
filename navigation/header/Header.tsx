import React, { Component, ReactElement } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp } from '@react-navigation/native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import RegulationsScreen from '../../screens/RegulationsScreen';
import LogoHeader from './LogoHeader';
import SearchScreen from '../../screens/SearchScreen';
import InfoScreen from '../../screens/InfoScreen';
import DecisionTreeScreen from '../../screens/DecisionTreeScreen';
import AppSearchBar from './AppSearchBar';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
  route: RouteProp<{ params: { screenName: string } }, 'params'>;
}
interface State {
  searchIsActive: boolean;
  searchIsTyping: boolean;
}

export default class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchIsActive: false,
      searchIsTyping: false,
    };
    this.getScreen = this.getScreen.bind(this);
    this.handleSearchIsTypingChange = this.handleSearchIsTypingChange.bind(
      this,
    );
    this.handleSearchIsActiveChange = this.handleSearchIsActiveChange.bind(
      this,
    );
    this.searchButton = this.searchButton.bind(this);
  }

  handleSearchIsTypingChange = (isTyping: boolean) =>
    this.setState({ searchIsTyping: isTyping });

  handleSearchIsActiveChange = (isActive: boolean) =>
    this.setState({ searchIsActive: isActive });

  getScreen(): ReactElement {
    const { searchIsTyping } = this.state;
    const { route } = this.props;

    if (searchIsTyping) {
      return <SearchScreen />;
    }

    switch (route.params.screenName) {
      case 'Regulations':
        return <RegulationsScreen />;
      case 'Info':
        return <InfoScreen />;
      case 'DecisionTree':
        return <DecisionTreeScreen />;
      default:
        return <SearchScreen />;
    }
  }

  searchButton(): ReactElement {
    return (
      <MaterialCommunityIcons
        style={{ marginRight: 10, marginTop: 10 }}
        name="magnify"
        color="#154594"
        size={26}
        onPress={() => {
          this.setState({ searchIsActive: true });
        }}
      />
    );
  }

  render() {
    const { searchIsActive } = this.state;
    const { navigation } = this.props;

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
          headerRight: () =>
            searchIsActive ? () => null : this.searchButton(),
        }}
      >
        <Stack.Screen
          name="Ambulancezorg Nederland"
          options={() =>
            searchIsActive
              ? {
                  header: () => (
                    <AppSearchBar
                      handleSearchIsTypingChange={
                        this.handleSearchIsTypingChange
                      }
                      handleSearchIsActiveChange={
                        this.handleSearchIsActiveChange
                      }
                    />
                  ),
                }
              : { headerTitle: () => <LogoHeader /> }
          }
        >
          {() => this.getScreen()}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}
