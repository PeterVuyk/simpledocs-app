import React, { FC } from 'react';
import { Icon } from 'native-base';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { StyleProp, ViewStyle } from 'react-native';
import { IconFamilyType } from '../../model/IconFamilyType';

interface Props {
  navigation: DrawerNavigationHelpers;
  drawerStyle: StyleProp<ViewStyle>;
  iconName: string;
  iconType: IconFamilyType;
}

const DrawerButton: FC<Props> = ({
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
