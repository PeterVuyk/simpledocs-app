import React, { FC, useEffect, useState } from 'react';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { connect } from 'react-redux';
import Animated, { interpolateNode } from 'react-native-reanimated';
import { setDrawerProgressListener } from '../drawer/onDrawerProgressListener';
import TabNavigator from './TabNavigator';
import DecisionsStackNavigator from '../StackNavigator/DecisionsStackNavigator';
import AboutUsStackNavigator from '../StackNavigator/AboutUsStackNavigator';
import CopyrightStackNavigator from '../StackNavigator/CopyrightStackNavigator';
import { AppConfigurations } from '../../model/AppConfigurations';
import SecondBookTabStackNavigator from '../StackNavigator/SecondBookTabStackNavigator';
import FirstBookTabStackNavigator from '../StackNavigator/FirstBookTabStackNavigator';
import SearchStackNavigator from '../StackNavigator/SearchStackNavigator';
import configurationsDAO from '../../fileSystem/configurationsDAO';
import scrolling from '../../redux/actions/scrolling';

const Tab = TabNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
  setScrollDirection: (direction: string) => void;
}

const TabNavigation: FC<Props> = ({ navigation, setScrollDirection }) => {
  const [appConfigurations, setAppConfigurations] =
    useState<AppConfigurations | null>(null);
  useEffect(() => {
    configurationsDAO
      .getAppConfiguration()
      .then(value => setAppConfigurations(value!));
  }, []);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const scale = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });
  const animatedStyle = { borderRadius, transform: [{ scale }] };

  useEffect(() => {
    setTimeout(() => {
      setScrollDirection('up');
    }, 400);
  }, [setScrollDirection]);

  useEffect(() => {
    setDrawerProgressListener((updatedProgress: Animated.Value<0>) =>
      setProgress(updatedProgress),
    );
  }, []);

  if (!appConfigurations) {
    return null;
  }

  return (
    <Animated.View style={[{ flex: 1, overflow: 'hidden' }, animatedStyle]}>
      <Tab.Navigator
        tabBarStyle={{
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          backgroundColor: '#154594',
        }}
        contentStyle={{
          height: 60,
        }}
        initialRouteName="SecondBookTabStack"
      >
        <Tab.Screen
          name="FirstBookTabStack"
          children={() => (
            <FirstBookTabStackNavigator
              navigation={navigation}
              tabInfo={appConfigurations.firstTab}
            />
          )}
          options={{
            title: appConfigurations.firstTab.bottomTab.title,
            icon: appConfigurations.firstTab.bottomTab.icon,
            iconFamilyType: appConfigurations.firstTab.bottomTab.familyType,
            showInBottomBar: true,
          }}
        />
        <Tab.Screen
          name="SecondBookTabStack"
          children={() => (
            <SecondBookTabStackNavigator
              navigation={navigation}
              tabInfo={appConfigurations.secondTab}
            />
          )}
          options={{
            title: appConfigurations.secondTab.bottomTab.title,
            icon: appConfigurations.secondTab.bottomTab.icon,
            iconFamilyType: appConfigurations.secondTab.bottomTab.familyType,
            showInBottomBar: true,
          }}
        />
        <Tab.Screen
          name="DecisionsScreenStack"
          children={() => (
            <DecisionsStackNavigator
              navigation={navigation}
              decisionTabInfo={appConfigurations.decisionsTab}
            />
          )}
          options={{
            title: appConfigurations.decisionsTab.bottomTab.title,
            icon: appConfigurations.decisionsTab.bottomTab.icon,
            iconFamilyType: appConfigurations.decisionsTab.bottomTab.familyType,
            showInBottomBar: true,
          }}
        />
        <Tab.Screen
          name="SearchStack"
          children={() => (
            <SearchStackNavigator appConfigurations={appConfigurations} />
          )}
          options={{
            title: 'Info',
            icon: 'information-outline',
            showInBottomBar: false,
          }}
        />
        <Tab.Screen
          name="AboutUsStack"
          component={AboutUsStackNavigator}
          options={{
            title: 'Info',
            icon: 'information-outline',
            showInBottomBar: false,
          }}
        />
        <Tab.Screen
          name="CopyrightStack"
          component={CopyrightStackNavigator}
          options={{
            title: 'Info',
            icon: 'information-outline',
            showInBottomBar: false,
          }}
        />
      </Tab.Navigator>
    </Animated.View>
  );
};

const mapStateToProps = state => {
  // maps the state van redux naar de props voor component.
  return {
    scrollDirection: state.scrolling.scrollDirection,
  };
};

const mapDispatchToProps = dispatch => {
  // maps the actions naar de props
  return {
    setScrollDirection: key => dispatch(scrolling.setScrollDirection(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigation);
