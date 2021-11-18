import React, { FC } from 'react';
import { Icon } from 'native-base';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { StyleSheet } from 'react-native';
import { IconFamilyType } from '../../model/style/IconFamilyType';
import globalStyle from '../../styling/globalStyle';

const styles = StyleSheet.create({
  buttonColor: {
    color: globalStyle.color.primary.main,
    padding: 10,
  },
  buttonColorDisabled: {
    color: globalStyle.color.secondary.main,
    padding: 10,
  },
});

interface Props {
  navigation?: DrawerNavigationHelpers;
  iconName: string;
  iconType: IconFamilyType;
}

const DrawerButton: FC<Props> = ({ navigation, iconType, iconName }) => {
  return (
    <Icon
      style={[navigation ? styles.buttonColor : styles.buttonColorDisabled]}
      name={iconName}
      type={iconType}
      onPress={() => {
        if (navigation) {
          navigation.openDrawer();
        }
      }}
    />
  );
};

export default DrawerButton;
