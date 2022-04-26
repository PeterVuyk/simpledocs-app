import React, { FC } from 'react';
import { Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import globalStyle from '../../styling/globalStyle';
import getFamilyIcon from '../getFamilyIcon';

const styles = StyleSheet.create({
  iconStyle: {
    zIndex: 100,
    position: 'absolute',
    right: 50,
    top: 0,
  },
});

const BookmarkIndicator: FC = () => {
  return (
    <Icon
      size="7"
      style={styles.iconStyle}
      color={globalStyle.color.primary.light}
      as={getFamilyIcon('MaterialCommunityIcons', 'bookmark-check')}
    />
  );
};

export default BookmarkIndicator;
