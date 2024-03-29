import React, { FC } from 'react';
import { DrawerItem as Item } from '@react-navigation/drawer';
import { Icon } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { IconFamilyType } from '../../model/style/IconFamilyType';
import globalStyle from '../../styling/globalStyle';
import getFamilyIcon from '../../components/getFamilyIcon';

const styles = StyleSheet.create({
  drawerDivider: {
    borderTopColor: globalStyle.color.default.light,
    borderTopWidth: 1,
    marginBottom: -5,
  },
  relativeContainer: { position: 'relative' },
  externalLinkContainer: { position: 'absolute', right: 18, top: 13 },
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
              size="7"
              color={globalStyle.color.default.rgbDark}
              as={getFamilyIcon('MaterialCommunityIcons', 'exit-to-app')}
            />
          </View>
        )}
        <Item
          style={styles.drawerDivider}
          label={label}
          onPress={onSubmit}
          icon={({ color }) => (
            <Icon
              size="7"
              color={color}
              as={getFamilyIcon(iconType, iconName)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default DrawerItem;
