import React, { FC } from 'react';
import { Icon } from 'native-base';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { IconFamilyType } from '../../model/style/IconFamilyType';
import globalStyle from '../../styling/globalStyle';
import getFamilyIcon from '../../components/getFamilyIcon';

interface Props {
  navigation?: DrawerNavigationHelpers;
  iconName: string;
  iconType: IconFamilyType;
}

const DrawerButton: FC<Props> = ({ navigation, iconType, iconName }) => {
  return (
    <Icon
      size="7"
      color={
        navigation
          ? globalStyle.color.primary.main
          : globalStyle.color.default.main
      }
      style={{ margin: 10 }}
      as={getFamilyIcon(iconType, iconName)}
      onPress={() => {
        if (navigation) {
          navigation.openDrawer();
        }
      }}
    />
  );
};

export default DrawerButton;
