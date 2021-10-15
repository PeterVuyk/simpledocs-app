import React, { FC, useEffect } from 'react';
import {
  Linking,
  Image,
  View,
  BackHandler,
  Platform,
  StyleSheet,
} from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Animated from 'react-native-reanimated';
import DrawerItem from './DrawerItem';
import { getDrawerProgressListener } from './onDrawerProgressListener';
import { IconFamilyType } from '../../model/IconFamilyType';
import { AppConfigurations } from '../../model/AppConfigurations';

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
  progress: Animated.Node<number>;
  navigation: DrawerNavigationHelpers;
  appConfigurations: AppConfigurations;
}

const DrawerContent: FC<Props> = ({
  progress,
  navigation,
  appConfigurations,
}) => {
  useEffect(() => {
    if (getDrawerProgressListener()) {
      getDrawerProgressListener()(progress);
    }
  }, [progress]);

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
          navigation.navigate('AboutUsStack', {
            screen: 'AboutUsScreen',
          });
        }}
        iconName="information-outline"
        iconType="MaterialCommunityIcons"
      />
      <DrawerItem
        label="Auteursrechten"
        onSubmit={() => {
          navigation.navigate('CopyrightStack', {
            screen: 'CopyrightScreen',
          });
        }}
        iconName="copyright"
        iconType="MaterialCommunityIcons"
      />
      {Platform.OS !== 'ios' && (
        <DrawerItem
          label="Afsluiten"
          onSubmit={(): void => {
            BackHandler.exitApp();
          }}
          iconName="close"
          iconType="MaterialCommunityIcons"
        />
      )}
    </View>
  );
};

export default DrawerContent;
