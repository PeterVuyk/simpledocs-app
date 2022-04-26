import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'native-base';
import globalStyle from '../../styling/globalStyle';
import bookPagesRepository from '../../database/repository/bookPagesRepository';
import { InfoBookPage } from '../../model/bookPages/InfoBookPage';
import getFamilyIcon from '../getFamilyIcon';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
  tabTitle: {
    ...globalStyle.typography.h4,
    textAlign: 'center',
    color: globalStyle.color.white,
  },
});

interface Props {
  infoBookPage: InfoBookPage;
  onClick: () => void;
}

const ToggleBookmarkViewButton: FC<Props> = ({ infoBookPage, onClick }) => {
  const handleClick = () => {
    bookPagesRepository.toggleBookmark(infoBookPage).then(onClick);
  };
  return (
    <TouchableOpacity
      style={[
        { backgroundColor: infoBookPage.bookmarked ? 'red' : 'green' },
        styles.container,
      ]}
      onPress={handleClick}
    >
      <Icon
        size="7"
        color={globalStyle.color.white}
        style={{ marginBottom: 10 }}
        as={getFamilyIcon(
          'MaterialCommunityIcons',
          infoBookPage.bookmarked
            ? 'bookmark-off-outline'
            : 'bookmark-plus-outline',
        )}
      />
      <Text style={styles.tabTitle}>
        {infoBookPage.bookmarked ? 'Verwijderen' : 'Toevoegen'}
      </Text>
    </TouchableOpacity>
  );
};

export default ToggleBookmarkViewButton;
