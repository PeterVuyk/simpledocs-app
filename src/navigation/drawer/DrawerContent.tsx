import React from 'react';
import { Linking, Image, View, BackHandler, Platform } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Animated from 'react-native-reanimated';
import DrawerItem from './DrawerItem';
import { getDrawerProgressListener } from './onDrawerProgressListener';

interface Props {
  progress: Animated.Node<number>;
  navigation: DrawerNavigationHelpers;
}

const DrawerContent: React.FC<Props> = ({ progress, navigation }) => {
  React.useEffect(() => {
    if (getDrawerProgressListener()) {
      getDrawerProgressListener()(progress);
    }
  }, [progress]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 80,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={require('../../../assets/images/azn.png')}
          style={{
            resizeMode: 'contain',
            width: 200,
            marginBottom: 20,
          }}
        />
      </View>
      <DrawerItem
        label="Ambulancezorg.nl"
        onSubmit={() => Linking.openURL('https://www.ambulancezorg.nl/')}
        iconName="exit-to-app"
        iconType="MaterialCommunityIcons"
      />
      <DrawerItem
        label="Nieuws"
        onSubmit={() => Linking.openURL('https://www.ambulancezorg.nl/nieuws')}
        iconName="newspaper"
        iconType="FontAwesome5"
      />
      <DrawerItem
        label="Actueel"
        onSubmit={() => Linking.openURL('https://www.ambulancezorg.nl/actueel')}
        iconName="topic"
        iconType="MaterialIcons"
      />
      <DrawerItem
        label="Contact"
        onSubmit={() => Linking.openURL('https://www.ambulancezorg.nl/contact')}
        iconName="contacts"
        iconType="AntDesign"
      />
      <DrawerItem
        label="Over de maker"
        onSubmit={() => {
          navigation.navigate('ScreenStack', {
            screen: 'AboutUsScreen',
          });
        }}
        iconName="information-outline"
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
