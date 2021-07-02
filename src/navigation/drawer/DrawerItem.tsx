import React, { FC } from 'react';
import { DrawerItem as Item } from '@react-navigation/drawer';
import { Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import { IconFamilyType } from '../../model/IconFamilyType';

const styles = StyleSheet.create({
  drawerDivider: {
    borderTopColor: '#d4d3d3',
    borderTopWidth: 1,
    marginBottom: -5,
  },
});

interface Props {
  label: string;
  onSubmit: () => void;
  iconName: string;
  iconType: IconFamilyType;
}

const DrawerItem: FC<Props> = ({ label, onSubmit, iconName, iconType }) => {
  return (
    <Item
      style={styles.drawerDivider}
      label={label}
      onPress={onSubmit}
      icon={({ color }) => (
        <Icon name={iconName} style={{ color }} type={iconType} fontSize={20} />
      )}
    />
  );
};

export default DrawerItem;
