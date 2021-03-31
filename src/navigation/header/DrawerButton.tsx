import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  navigation: DrawerNavigationHelpers;
  drawerStyle: StyleProp<ViewStyle>;
}

const DrawerButton: React.FC<Props> = ({ drawerStyle, navigation }) => {
  return (
    <MaterialCommunityIcons
      style={drawerStyle}
      name="menu"
      color="#154594"
      size={26}
      onPress={() => navigation.openDrawer()}
    />
  );
};

export default DrawerButton;
