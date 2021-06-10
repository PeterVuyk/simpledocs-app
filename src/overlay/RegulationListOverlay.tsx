import React from 'react';
import { Button, ListItem, Overlay } from 'react-native-elements';
import { View, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import articleRepository from '../database/repository/articleRepository';
import SVGIcon from '../components/SVGIcon';
import { ArticleChapter } from '../database/entity/ArticleChapter';

interface Props {
  toggleOverlay: () => void;
}

const RegulationListOverlay: React.FC<Props> = ({ toggleOverlay }) => {
  const [chapters, setChapters] = React.useState<ArticleChapter[]>([]);

  const navigation = useNavigation<StackNavigationProp<any>>();

  React.useEffect(() => {
    articleRepository.getChapters(setChapters);
  }, [setChapters]);

  const renderItem = (item: ArticleChapter) => (
    <ListItem
      bottomDivider
      onPress={() => {
        toggleOverlay();
        navigation.push('RegulationDetailsScreen', {
          articleChapter: item.chapter,
        });
      }}
    >
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
          buttonStyle={{ backgroundColor: '#154594', borderRadius: 5 }}
        />
      </Overlay>
    </View>
  );
};

export default RegulationListOverlay;
