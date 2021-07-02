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
}

const DrawerContent: FC<Props> = ({ progress, navigation }) => {
  useEffect(() => {
    if (getDrawerProgressListener()) {
      getDrawerProgressListener()(progress);
    }
  }, [progress]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.drawerImageContainer}>
        <Image
          source={require('../../../assets/images/azn.png')}
          style={styles.drawerImage}
        />
      </View>
      <DrawerItem
        label="Ambulancezorg.nl"
        onSubmit={() => Linking.openURL('https://www.ambulancezorg.nl/')}
        iconName="exit-to-app"
        iconType="MaterialCommunityIcons"
      />
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
