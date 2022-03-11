import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { FlatList, LayoutChangeEvent, StyleSheet, View } from 'react-native';
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

interface Dimension {
  chapter: string;
  width: number;
  pageIndex: number;
}

const BookChapterNavigator: FC<Props> = ({
  onPageChange,
  currentChapter,
  infoBookPages,
}) => {
  const flatListRef = useRef<FlatList<InfoBookPage> | null>(null);
  const didMountRef = useRef(false);
  const dimensionRef = useRef<Dimension[]>([]);

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

  const measureView = (event: LayoutChangeEvent, item: InfoBookPage) => {
    if (!dimensionRef.current.find(value => value.chapter === item.chapter)) {
      dimensionRef.current.push({
        chapter: item.chapter,
        pageIndex: item.pageIndex,
        width: event.nativeEvent.layout.width,
      });
    }
  };

  // TODO: Works for now, but is there a more efficient way?
  const getOffset = useMemo(() => {
    let result = 0;
    for (const dimension of dimensionRef.current.sort(
      (a, b) => a.pageIndex - b.pageIndex,
    )) {
      if (dimension.chapter === currentChapter) {
        return result;
      }
      result += dimension.width;
    }
    return result;
  }, [currentChapter]);

  const renderItem = useCallback(
    (item: InfoBookPage) => {
      return (
        <View onLayout={event => measureView(event, item)} key={item.id}>
          <NavigatorChip
            id={item.chapter}
            title={item.chapter}
            isSelected={item.chapter === currentChapter}
            onPress={onPageChange}
          />
        </View>
      );
    },
    [currentChapter, onPageChange],
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
        initialNumToRender={infoBookPages.length}
        getItemLayout={(data, index) => {
          const length =
            dimensionRef.current.find(value => value.chapter === currentChapter)
              ?.width ?? 0;
          return {
            length,
            offset: getOffset,
            index,
          };
        }}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  );
};

export default React.memo(BookChapterNavigator);
