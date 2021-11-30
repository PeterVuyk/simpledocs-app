import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import getWidth from 'string-pixel-width';
import { InfoBookPage } from '../../model/bookPages/InfoBookPage';
import NavigatorChip from '../../components/NavigatorChip';
import globalStyle from '../../styling/globalStyle';

interface Props {
  onPageChange: (chapter: string) => void;
  currentChapter: string;
  infoBookPages: InfoBookPage[];
}

const styles = StyleSheet.create({
  navigationBorder: {
    borderBottomColor: globalStyle.color.default.light,
    borderBottomWidth: 1,
  },
  navigationContainer: {
    paddingBottom: 5,
    marginBottom: 0,
    marginTop: 5,
  },
});

const BookChapterNavigator: FC<Props> = ({
  onPageChange,
  currentChapter,
  infoBookPages,
}) => {
  const flatListRef = useRef<FlatList<InfoBookPage> | null>(null);
  const didMountRef = useRef(false);

  const chipWidth = useMemo(() => {
    const maxCharacters = Math.max(
      ...infoBookPages.map(value => value.chapter.length),
    );
    return getWidth('W'.repeat(maxCharacters), { bold: true, size: 16 }) + 5;
  }, [infoBookPages]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    const index = infoBookPages
      .map(chapter => chapter.chapter)
      .indexOf(currentChapter);
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index === -1 ? 1 : index,
    });
  }, [infoBookPages, currentChapter]);

  const renderItem = useCallback(
    (item: InfoBookPage) => {
      return (
        <NavigatorChip
          id={item.chapter}
          title={item.chapter}
          isSelected={item.chapter === currentChapter}
          onPress={onPageChange}
          width={chipWidth}
        />
      );
    },
    [chipWidth, currentChapter, onPageChange],
  );

  return (
    <View style={{ backgroundColor: globalStyle.color.white }}>
      <FlatList
        style={[styles.navigationContainer, styles.navigationBorder]}
        ref={flatListRef}
        keyExtractor={item => item.id.toString()}
        initialScrollIndex={infoBookPages
          .map(chapter => chapter.chapter)
          .indexOf(currentChapter)}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        extraData={infoBookPages}
        data={infoBookPages}
        getItemLayout={(data, index) => {
          return {
            length: chipWidth + 4,
            // offset is width item times the index, then we want to show the previous chapter also in the list. Finally we add the padding around the Chips
            offset: chipWidth * index - chipWidth + index * 4 - 2,
            index,
          };
        }}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  );
};

export default BookChapterNavigator;
