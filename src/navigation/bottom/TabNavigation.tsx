import React, { FC } from 'react';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import TabNavigator from './TabNavigator';
import { AppConfigurations } from '../../model/configurations/AppConfigurations';
import SecondBookTabStackNavigator from '../StackNavigator/SecondBookTabStackNavigator';
import FirstBookTabStackNavigator from '../StackNavigator/FirstBookTabStackNavigator';
import BookmarksStackNavigator from '../StackNavigator/BookmarksStackNavigator';
import Header from '../header/Header';
import ThirdBookTabStackNavigator from '../StackNavigator/ThirdBookTabStackNavigator';

const Tab = TabNavigator();

interface Props {
  appConfigurations: AppConfigurations;
  navigation: DrawerNavigationHelpers;
}

const TabNavigation: FC<Props> = ({ navigation, appConfigurations }) => {
  return (
    <>
      {/* <ResizeScreenDrawer> */}
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
        {appConfigurations.thirdBookTab.bookTypes.length !== 0 && (
          <Tab.Screen
            name="ThirdBookTabStack"
            children={() => (
              <ThirdBookTabStackNavigator
                bookTabInfo={appConfigurations.thirdBookTab}
              />
            )}
            options={{
              title: appConfigurations.thirdBookTab.bottomTab.title,
              icon: appConfigurations.thirdBookTab.bottomTab.icon,
              iconFamilyType:
                appConfigurations.thirdBookTab.bottomTab.familyType,
            }}
          />
        )}
      </Tab.Navigator>
      {/* </ResizeScreenDrawer> */}
    </>
  );
};

export default TabNavigation;
