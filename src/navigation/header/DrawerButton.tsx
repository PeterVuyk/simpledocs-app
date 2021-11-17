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
  buttonColorDisabled: {
    color: '#b7b7b7',
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
      style={[navigation ? styles.buttonColor : styles.buttonColorDisabled]}
      name={iconName}
      type={iconType}
      fontSize={26}
      onPress={() => {
        if (navigation) {
          navigation.openDrawer();
        }
      }}
    />
  );
};

export default DrawerButton;
