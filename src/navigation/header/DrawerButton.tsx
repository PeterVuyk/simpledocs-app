import React, { FC } from 'react';
import { Icon } from 'native-base';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { StyleSheet } from 'react-native';
import { IconFamilyType } from '../../model/IconFamilyType';

const styles = StyleSheet.create({
  buttonColor: {
    color: '#154594',
    padding: 10,
  },
});

interface Props {
  navigation: DrawerNavigationHelpers;
  iconName: string;
  iconType: IconFamilyType;
}

const DrawerButton: FC<Props> = ({ navigation, iconType, iconName }) => {
  return (
    <Icon
      style={styles.buttonColor}
      name={iconName}
      type={iconType}
      fontSize={26}
      onPress={() => navigation.openDrawer()}
    />
  );
};

export default DrawerButton;
