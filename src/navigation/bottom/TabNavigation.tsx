import React, { FC } from 'react';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import TabNavigator from './TabNavigator';
import DecisionsStackNavigator from '../StackNavigator/DecisionsStackNavigator';
import { AppConfigurations } from '../../model/configurations/AppConfigurations';
import SecondBookTabStackNavigator from '../StackNavigator/SecondBookTabStackNavigator';
import FirstBookTabStackNavigator from '../StackNavigator/FirstBookTabStackNavigator';
import ResizeScreenDrawer from '../drawer/ResizeScreenDrawer';
import BookmarksStackNavigator from '../StackNavigator/BookmarksStackNavigator';
import Header from '../header/Header';

const Tab = TabNavigator();

interface Props {
  appConfigurations: AppConfigurations;
  navigation: DrawerNavigationHelpers;
}

const TabNavigation: FC<Props> = ({ navigation, appConfigurations }) => {
  return (
    <ResizeScreenDrawer>
      <Header navigation={navigation} />
      <Tab.Navigator
        contentStyle={{
          height: 60,
        }}
        initialRouteName="FirstBookTabStack"
      >
        <Tab.Screen
          name="BookmarkTabStack"
          children={() => <BookmarksStackNavigator />}
          options={{
            title: 'Favorieten',
            icon: 'bookmark-check',
            iconFamilyType: 'MaterialCommunityIcons',
          }}
        />
        {appConfigurations.firstBookTab.bookTypes.length !== 0 && (
          <Tab.Screen
            name="FirstBookTabStack"
            children={() => (
              <FirstBookTabStackNavigator
                bookTabInfo={appConfigurations.firstBookTab}
              />
            )}
            options={{
              title: appConfigurations.firstBookTab.bottomTab.title,
              icon: appConfigurations.firstBookTab.bottomTab.icon,
              iconFamilyType:
                appConfigurations.firstBookTab.bottomTab.familyType,
            }}
          />
        )}
        {appConfigurations.secondBookTab.bookTypes.length !== 0 && (
          <Tab.Screen
            name="SecondBookTabStack"
            children={() => (
              <SecondBookTabStackNavigator
                bookTabInfo={appConfigurations.secondBookTab}
              />
            )}
            options={{
              title: appConfigurations.secondBookTab.bottomTab.title,
              icon: appConfigurations.secondBookTab.bottomTab.icon,
              iconFamilyType:
                appConfigurations.secondBookTab.bottomTab.familyType,
            }}
          />
        )}
        {appConfigurations.decisionsTab.indexDecisionType.length !== 0 && (
          <Tab.Screen
            name="DecisionsScreenStack"
            children={() => (
              <DecisionsStackNavigator
                decisionTabInfo={appConfigurations.decisionsTab}
              />
            )}
            options={{
              title: appConfigurations.decisionsTab.bottomTab.title,
              icon: appConfigurations.decisionsTab.bottomTab.icon,
              iconFamilyType:
                appConfigurations.decisionsTab.bottomTab.familyType,
            }}
          />
        )}
      </Tab.Navigator>
    </ResizeScreenDrawer>
  );
};

export default TabNavigation;
