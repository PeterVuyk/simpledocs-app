import React, { FC } from 'react';
import { DrawerItem as Item } from '@react-navigation/drawer';
import { Icon } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { IconFamilyType } from '../../model/style/IconFamilyType';
import globalStyle from '../../styling/globalStyle';

const styles = StyleSheet.create({
  drawerDivider: {
    borderTopColor: globalStyle.color.secondary.light,
    borderTopWidth: 1,
    marginBottom: -5,
  },
  relativeContainer: { position: 'relative' },
  externalLinkContainer: { position: 'absolute', right: 18, top: 13 },
  externalLinkColor: { color: globalStyle.color.secondary.rgbDark },
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
              fontSize={globalStyle.icon.size.medium}
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
              fontSize={globalStyle.icon.size.medium}
            />
          )}
        />
      </View>
    </View>
  );
};

export default DrawerItem;
