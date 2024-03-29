import React, { FC, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import { InfoBookPage } from '../../../model/bookPages/InfoBookPage';
import TitleBar from '../../../components/titleBar/TitleBar';
import { BookTabInfo } from '../../../model/configurations/AppConfigurations';
import globalStyle from '../../../styling/globalStyle';
import BookPageListItem from './BookPageListItem';
import LoadingSpinner from '../../../components/LoadingSpinner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.color.white,
    paddingBottom: 60,
  },
});

interface Props {
  bookTabInfo: BookTabInfo;
  showHeader: boolean;
  showChapterDivisions?: string[];
  navigation: DrawerNavigationProp<any>;
  InfoBookPages: InfoBookPage[];
  onReloadPages: () => void;
  bookType: string;
}

const BookPagesList: FC<Props> = ({
  bookTabInfo,
  showHeader,
  showChapterDivisions,
  navigation,
  InfoBookPages,
  onReloadPages,
  bookType,
}) => {
  const getChapters = () => {
    if (!showChapterDivisions) {
      return InfoBookPages;
    }
    return InfoBookPages.filter(chapter =>
      showChapterDivisions.includes(chapter.chapterDivision),
    );
  };

  const getHeader = () => {
    if (!showHeader) {
      return <></>;
    }
    const bookInfo = bookTabInfo.bookTypes.find(
      value => value.bookType === bookType,
    );
    if (!bookInfo) {
      return <></>;
    }
    return (
      <TitleBar
        title={bookInfo.title}
        subTitle={bookInfo.subTitle ?? ''}
        bottomDivider
      />
    );
  };

  const bookPageListItem = useCallback(
    (item: InfoBookPage) => {
      return (
        <View key={item.id}>
          <BookPageListItem
            showChapterDivisions={showChapterDivisions}
            infoBookPage={item}
            infoBookPages={InfoBookPages}
            navigation={navigation}
            onReloadPages={onReloadPages}
            bookType={bookType}
          />
        </View>
      );
    },
    [InfoBookPages, bookType, navigation, onReloadPages, showChapterDivisions],
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={getHeader}
        keyExtractor={item => item.id?.toString() ?? ''}
        ListEmptyComponent={
          <View style={{ margin: 20 }}>
            <LoadingSpinner />
          </View>
        }
        extraData={getChapters()}
        data={getChapters()}
        renderItem={({ item }) => bookPageListItem(item)}
      />
    </View>
  );
};

export default BookPagesList;
