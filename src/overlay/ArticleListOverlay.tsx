import React, { FC, useEffect, useState } from 'react';
import { Button, ListItem, Overlay } from 'react-native-elements';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import articleRepository from '../database/repository/articleRepository';
import SVGIcon from '../components/SVGIcon';
import { ArticleChapter } from '../model/ArticleChapter';
import articleTypeHelper from '../helper/articleTypeHelper';
import { ARTICLE_TAB_REGULATIONS } from '../model/ArticleType';

const styles = StyleSheet.create({
  buttonStyle: { backgroundColor: '#154594', borderRadius: 5 },
});

interface Props {
  articleType: string;
  toggleOverlay: () => void;
}

const ArticleListOverlay: FC<Props> = ({ articleType, toggleOverlay }) => {
  const [chapters, setChapters] = useState<ArticleChapter[]>([]);

  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    articleRepository.getChapters(articleType, setChapters);
  }, [articleType, setChapters]);

  const handleChapterClick = (item: ArticleChapter) => {
    toggleOverlay();
    if (
      articleTypeHelper.getTabByArticleType(articleType) ===
      ARTICLE_TAB_REGULATIONS
    ) {
      navigation.push('RegulationDetailsScreen', {
        articleChapter: item.chapter,
        articleType,
      });
      return;
    }
    navigation.push('InstructionManualDetailsScreen', {
      articleChapter: item.chapter,
      articleType,
    });
  };

  const renderItem = (item: ArticleChapter) => (
    <ListItem bottomDivider onPress={() => handleChapterClick(item)}>
      <SVGIcon iconBlob={item.iconFile} />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
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
