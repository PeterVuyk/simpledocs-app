import React, { FC } from 'react';
import { Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import globalStyle from '../../styling/globalStyle';

const styles = StyleSheet.create({
  iconStyle: {
    zIndex: 100,
    color: globalStyle.color.primary.light,
    position: 'absolute',
    right: 50,
    top: 0,
  },
});

const BookmarkIndicator: FC = () => {
  return (
    <Icon
      style={styles.iconStyle}
      name="bookmark-check"
      type="MaterialCommunityIcons"
      fontSize={globalStyle.icon.size.large}
    />
  );
};

export default BookmarkIndicator;
