import React from 'react';
import { Icon } from 'native-base';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  navigation: DrawerNavigationHelpers;
  drawerStyle: StyleProp<ViewStyle>;
  iconName: string;
  iconType:
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial';
}

const DrawerButton: React.FC<Props> = ({
  drawerStyle,
  navigation,
  iconType,
  iconName,
}) => {
  return (
    <Icon
      style={[{ color: '#154594' }, drawerStyle]}
      name={iconName}
      type={iconType}
      fontSize={26}
      onPress={() => navigation.openDrawer()}
    />
  );
};

export default DrawerButton;
