import React, { FC } from 'react';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import TabNavigator from './TabNavigator';
import DecisionsStackNavigator from '../StackNavigator/DecisionsStackNavigator';
import { AppConfigurations } from '../../model/configurations/AppConfigurations';
import SecondBookTabStackNavigator from '../StackNavigator/SecondBookTabStackNavigator';
import FirstBookTabStackNavigator from '../StackNavigator/FirstBookTabStackNavigator';
import ResizeScreenDrawer from '../drawer/ResizeScreenDrawer';
import FavoritesStackNavigator from '../StackNavigator/FavoritesStackNavigator';

const Tab = TabNavigator();

interface Props {
  appConfigurations: AppConfigurations;
  navigation: DrawerNavigationHelpers;
}

const TabNavigation: FC<Props> = ({ navigation, appConfigurations }) => {
  const getInitialRoute = () => {
    switch (appConfigurations.defaultInitialTab) {
      case 'secondBookTab':
        return 'SecondBookTabStack';
      case 'decisionTab':
        return 'DecisionsScreenStack';
      case 'favorites':
        return 'FavoritesTabStack';
      case 'firstBookTab':
      default:
        return 'FirstBookTabStack';
    }
  };

  return (
    <ResizeScreenDrawer>
      <Tab.Navigator
        contentStyle={{
          height: 60,
        }}
        initialRouteName={getInitialRoute()}
      >
        <Tab.Screen
          name="FavoritesTabStack"
          children={() => (
            <FavoritesStackNavigator
              navigation={navigation}
              bookTabInfo={appConfigurations.firstBookTab}
            />
          )}
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
                navigation={navigation}
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
                navigation={navigation}
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
                navigation={navigation}
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
