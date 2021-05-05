import React from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import regulationRepository, {
  Regulation,
} from '../database/repository/regulationRepository';
import ChapterIcon from '../components/ChapterIcon';

interface Props {
  navigation: DrawerNavigationProp<any>;
}

const RegulationsScreen: React.FC<Props> = ({ navigation }) => {
  const [regulations, setRegulations] = React.useState<Regulation[]>([]);

  React.useEffect(() => {
    regulationRepository.getChaptersByLevelChapter(setRegulations);
  }, []);

  const renderItem = (item: Regulation) => (
    <ListItem
      bottomDivider
      onPress={() =>
        navigation.navigate('RegulationDetailsScreen', {
          regulationChapter: item.chapter,
        })
      }
    >
      <ChapterIcon iconBlob={item.iconFile} />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.subTitle}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={{ flex: 1, paddingBottom: 50, backgroundColor: '#fff' }}>
      {regulations && (
        <FlatList<Regulation>
          keyExtractor={item => item.chapter.toString()}
          data={regulations}
          renderItem={({ item }) => renderItem(item)}
        />
      )}
    </View>
  );
};

export default RegulationsScreen;
