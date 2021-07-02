import React, { FC } from 'react';
import { Icon } from 'native-base';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { IconFamilyType } from '../../model/IconFamilyType';

const styles = StyleSheet.create({
  buttonColor: {
    color: '#154594',
  },
});

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
      style={[styles.buttonColor, drawerStyle]}
      name={iconName}
      type={iconType}
      fontSize={26}
      onPress={() => navigation.openDrawer()}
    />
  );
};

export default DrawerButton;
