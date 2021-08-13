import React, { FC, useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { connect } from 'react-redux';
import { setDrawerProgressListener } from '../drawer/onDrawerProgressListener';
import TabNavigator from './TabNavigator';
import DecisionsStackNavigator from '../StackNavigator/DecisionsStackNavigator';
import AboutUsStackNavigator from '../StackNavigator/AboutUsStackNavigator';
import CopyrightStackNavigator from '../StackNavigator/CopyrightStackNavigator';
import { ConfigInfo } from '../../model/ConfigInfo';
import SecondBookTabStackNavigator from '../StackNavigator/SecondBookTabStackNavigator';
import FirstBookTabStackNavigator from '../StackNavigator/FirstBookTabStackNavigator';
import SearchStackNavigator from '../StackNavigator/SearchStackNavigator';
import appConfigDAO from '../../fileSystem/appConfigDAO';
import scrolling from '../../redux/actions/scrolling';

const Tab = TabNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
  setScrollDirection: (direction: string) => void;
}

const TabNavigation: FC<Props> = ({ navigation, setScrollDirection }) => {
  const [configInfo, setConfigInfo] = useState<ConfigInfo | null>(null);
  useEffect(() => {
    appConfigDAO.getAppConfig().then(value => setConfigInfo(value));
  }, []);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });
  const animatedStyle = { borderRadius, transform: [{ scale }] };

  useEffect(() => {
    setTimeout(() => {
      setScrollDirection('up');
    }, 1000);
  }, [setScrollDirection]);

  useEffect(() => {
    setDrawerProgressListener((updatedProgress: Animated.Value<0>) =>
      setProgress(updatedProgress),
    );
  }, []);

  if (!configInfo) {
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
              tabInfo={configInfo.firstTab}
            />
          )}
          options={{
            title: configInfo.firstTab.bottomTab.title,
            icon: configInfo.firstTab.bottomTab.icon,
            iconFamilyType: configInfo.firstTab.bottomTab.familyType,
            showInBottomBar: true,
          }}
        />
        <Tab.Screen
          name="SecondBookTabStack"
          children={() => (
            <SecondBookTabStackNavigator
              navigation={navigation}
              tabInfo={configInfo.secondTab}
            />
          )}
          options={{
            title: configInfo.secondTab.bottomTab.title,
            icon: configInfo.secondTab.bottomTab.icon,
            iconFamilyType: configInfo.secondTab.bottomTab.familyType,
            showInBottomBar: true,
          }}
        />
        <Tab.Screen
          name="DecisionsScreenStack"
          children={() => (
            <DecisionsStackNavigator
              navigation={navigation}
              decisionTabInfo={configInfo.decisionsTab}
            />
          )}
          options={{
            title: configInfo.decisionsTab.bottomTab.title,
            icon: configInfo.decisionsTab.bottomTab.icon,
            iconFamilyType: configInfo.decisionsTab.bottomTab.familyType,
            showInBottomBar: true,
          }}
        />
        <Tab.Screen
          name="SearchStack"
          children={() => <SearchStackNavigator configInfo={configInfo} />}
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
