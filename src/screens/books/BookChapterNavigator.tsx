import React, { FC, useCallback, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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
  const myScroll = useRef<ScrollView | null>(null);
  const myChildren = useRef<View[] | null[]>([]);

  useEffect(() => {
    const scrollToIndex = async () => {
      const index = infoBookPages
        .map(chapter => chapter.chapter)
        .indexOf(currentChapter);
      let totalWidth = 0;
      for (let i = 0; i < index; i++) {
        totalWidth += await new Promise<number>(resolve => {
          myChildren.current[i]?.measure((ox, oy, width) => {
            resolve(width);
          });
        });
      }
      myScroll.current?.scrollTo({ x: totalWidth - 75, animated: true });
    };
    scrollToIndex();
  }, [currentChapter, infoBookPages]);

  const renderItem = useCallback(
    (item: InfoBookPage, index) => {
      return (
        <View
          collapsable={false}
          ref={el => {
            myChildren.current[index] = el;
          }}
          key={item.id}
        >
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
      <ScrollView
        ref={ref => {
          myScroll.current = ref;
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={[styles.navigationContainer, styles.navigationBorder]}
      >
        {infoBookPages.map((page, index) => renderItem(page, index))}
      </ScrollView>
    </View>
  );
};

export default React.memo(BookChapterNavigator);
