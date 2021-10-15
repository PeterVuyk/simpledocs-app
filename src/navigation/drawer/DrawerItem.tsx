import React, { FC } from 'react';
import { DrawerItem as Item } from '@react-navigation/drawer';
import { Icon } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { IconFamilyType } from '../../model/IconFamilyType';

const styles = StyleSheet.create({
  drawerDivider: {
    borderTopColor: '#d4d3d3',
    borderTopWidth: 1,
    marginBottom: -5,
  },
  relativeContainer: { position: 'relative' },
  externalLinkContainer: { position: 'absolute', right: 18, top: 13 },
  externalLinkColor: { color: 'rgba(28, 28, 30, 0.68)' },
});

interface Props {
  label: string;
  onSubmit: () => void;
  iconName: string;
  iconType: IconFamilyType;
  isExternalLink?: boolean;
}

const DrawerItem: FC<Props> = ({
  label,
  onSubmit,
  iconName,
  iconType,
  isExternalLink,
}) => {
  return (
    <View>
      <View style={styles.relativeContainer}>
        {isExternalLink && (
          <View style={styles.externalLinkContainer}>
            <Icon
              name="exit-to-app"
              style={styles.externalLinkColor}
              type="MaterialCommunityIcons"
              fontSize={20}
            />
          </View>
        )}
        <Item
          style={styles.drawerDivider}
          label={label}
          onPress={onSubmit}
          icon={({ color }) => (
            <Icon
              name={iconName}
              style={{ color }}
              type={iconType}
              fontSize={20}
            />
          )}
        />
      </View>
    </View>
  );
};

export default DrawerItem;
