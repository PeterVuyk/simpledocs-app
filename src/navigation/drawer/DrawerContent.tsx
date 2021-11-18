import React, { FC } from 'react';
import { Linking, Image, View, Platform, StyleSheet } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import DrawerItem from './DrawerItem';
import { IconFamilyType } from '../../model/style/IconFamilyType';
import { AppConfigurations } from '../../model/configurations/AppConfigurations';

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
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.drawerImageContainer}>
        <Image
          source={require('../../../assets/images/company-logo.png')}
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
        label="Over de maker"
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
      {Platform.OS !== 'ios' && (
        <DrawerItem
          label="Terug"
          onSubmit={(): void => {
            navigation.closeDrawer();
          }}
          iconName="arrow-back"
          iconType="Ionicons"
        />
      )}
    </View>
  );
};

export default DrawerContent;
