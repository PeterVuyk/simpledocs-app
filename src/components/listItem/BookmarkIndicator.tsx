import React, { FC } from 'react';
import { Icon } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  iconStyle: {
    zIndex: 100,
    color: '#5bb5f6',
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
      fontSize={26}
    />
  );
};

export default BookmarkIndicator;
