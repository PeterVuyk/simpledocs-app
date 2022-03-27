import React, { FC, useState } from 'react';
import { Linking, Image, View, StyleSheet } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import DrawerItem from './DrawerItem';
import { IconFamilyType } from '../../model/style/IconFamilyType';
import { AppConfigurations } from '../../model/configurations/AppConfigurations';
import SettingsModal from './settings/SettingsModal';
import { STANDALONE_PAGE_TYPE_DISCLAIMER } from '../../model/standalonePages/StandalonePageType';
import globalStyle from '../../styling/globalStyle';

const styles = StyleSheet.create({
  drawerImageContainer: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerImage: {
    resizeMode: 'contain',
    width: 200,
    marginBottom: 20,
  },
  drawerBottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: globalStyle.color.primary.main,
  },
});

interface Props {
  navigation: DrawerNavigationHelpers;
  appConfigurations: AppConfigurations;
}

const DrawerContent: FC<Props> = ({ navigation, appConfigurations }) => {
  const [settingsModalVisible, setSettingsModalVisible] =
    useState<boolean>(false);

  return (
    <>
      <View style={{ flex: 1, marginBottom: 60 }}>
        <View style={styles.drawerImageContainer}>
          <Image
            source={require('../../../assets/company-logo.png')}
            style={styles.drawerImage}
          />
        </View>
        {appConfigurations.drawer.links
          ?.sort((a, b) => a.index.localeCompare(b.index))
          .map(link => (
            <DrawerItem
              isExternalLink
              key={link.title}
              label={link.title}
              onSubmit={() => Linking.openURL(link.url)}
              iconName={link.iconName}
              iconType={link.iconType as IconFamilyType}
            />
          ))}
        {appConfigurations.drawer.enabledStandalonePagesTypes[
          STANDALONE_PAGE_TYPE_DISCLAIMER
        ] && (
          <DrawerItem
            label="Disclaimer"
            onSubmit={() => {
              navigation.navigate('DisclaimerScreen');
            }}
            iconName="scale-balance"
            iconType="MaterialCommunityIcons"
          />
        )}
        <DrawerItem
          label="Instellingen"
          onSubmit={() => {
            navigation.closeDrawer();
            setSettingsModalVisible(true);
          }}
          iconName="app-settings-alt"
          iconType="MaterialIcons"
        />
        {settingsModalVisible && (
          <SettingsModal onCloseModal={() => setSettingsModalVisible(false)} />
        )}
      </View>
      <View style={styles.drawerBottomContainer} />
    </>
  );
};

export default DrawerContent;
