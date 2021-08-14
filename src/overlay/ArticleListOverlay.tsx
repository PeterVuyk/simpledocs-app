import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, ListItem, Overlay } from 'react-native-elements';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import articleRepository from '../database/repository/articleRepository';
import SVGIcon from '../components/SVGIcon';
import { ArticleChapter } from '../model/ArticleChapter';
import configHelper from '../helper/configHelper';
import { SECOND_BOOK_TAB } from '../model/BookTab';

const styles = StyleSheet.create({
  buttonStyle: { backgroundColor: '#154594', borderRadius: 5 },
});

interface Props {
  bookType: string;
  toggleOverlay: () => void;
}

const ArticleListOverlay: FC<Props> = ({ bookType, toggleOverlay }) => {
  const [chapters, setChapters] = useState<ArticleChapter[]>([]);

  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    articleRepository.getChapters(bookType, setChapters);
  }, [bookType, setChapters]);

  const handleChapterClick = useCallback(
    async (item: ArticleChapter) => {
      toggleOverlay();
      if ((await configHelper.getTabByBookType(bookType)) === SECOND_BOOK_TAB) {
        navigation.push('SecondBookTabDetailsScreen', {
          articleChapter: item.chapter,
          bookType,
        });
        return;
      }
      navigation.push('FirstBookTabDetailsScreen', {
        articleChapter: item.chapter,
        bookType,
      });
    },
    [bookType, navigation, toggleOverlay],
  );

  const renderItem = useCallback(
    (item: ArticleChapter) => (
      <ListItem bottomDivider onPress={() => handleChapterClick(item)}>
        <SVGIcon iconBlob={item.iconFile} />
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ),
    [handleChapterClick],
  );

  return (
    <View
      style={{
        width: Dimensions.get('window').width,
      }}
    >
      <Overlay fullScreen isVisible onBackdropPress={toggleOverlay}>
        <FlatList
          keyExtractor={item => item.chapter.toString()}
          data={chapters}
          renderItem={({ item }) => renderItem(item)}
        />
        <Button
          title="Terug"
          onPress={toggleOverlay}
          buttonStyle={styles.buttonStyle}
        />
      </Overlay>
    </View>
  );
};

export default ArticleListOverlay;
