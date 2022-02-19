import React, { FC, useState } from 'react';
import { Linking, Image, View, StyleSheet } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import DrawerItem from './DrawerItem';
import { IconFamilyType } from '../../model/style/IconFamilyType';
import { AppConfigurations } from '../../model/configurations/AppConfigurations';
import SettingsModal from './settings/SettingsModal';

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
});

interface Props {
  navigation: DrawerNavigationHelpers;
  appConfigurations: AppConfigurations;
}

const DrawerContent: FC<Props> = ({ navigation, appConfigurations }) => {
  const [settingsModalVisible, setSettingsModalVisible] =
    useState<boolean>(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.drawerImageContainer}>
        <Image
          source={require('../../../assets/company-logo.png')}
          style={styles.drawerImage}
        />
      </View>
      {appConfigurations.drawer.links?.map(link => (
        <DrawerItem
          isExternalLink
          key={link.title}
          label={link.title}
          onSubmit={() => Linking.openURL(link.url)}
          iconName={link.iconName}
          iconType={link.iconType as IconFamilyType}
        />
      ))}
      <DrawerItem
        label="Over Academie voor Ambulancezorg"
        onSubmit={() => {
          navigation.navigate('AboutUsScreen');
        }}
        iconName="information-outline"
        iconType="MaterialCommunityIcons"
      />
      <DrawerItem
        label="Auteursrechten"
        onSubmit={() => {
          navigation.navigate('CopyrightScreen');
        }}
        iconName="copyright"
        iconType="MaterialCommunityIcons"
      />
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
  );
};

export default DrawerContent;
