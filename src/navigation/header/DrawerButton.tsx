import React from 'react';
import { Icon } from 'native-base';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  navigation: DrawerNavigationHelpers;
  drawerStyle: StyleProp<ViewStyle>;
}

const DrawerButton: React.FC<Props> = ({ drawerStyle, navigation }) => {
  return (
    <Icon
      style={[{ color: '#154594' }, drawerStyle]}
      name="menu"
      type="MaterialCommunityIcons"
      fontSize={26}
      onPress={() => navigation.openDrawer()}
    />
  );
};

export default DrawerButton;
