import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

interface Props {
  navigation: DrawerNavigationHelpers;
}

const DrawerButton: React.FC<Props> = ({ navigation }) => {
  return (
    <MaterialCommunityIcons
      style={{ marginLeft: 10, marginTop: 10 }}
      name="menu"
      color="#154594"
      size={26}
      onPress={() => navigation.openDrawer()}
    />
  );
};

export default DrawerButton;
