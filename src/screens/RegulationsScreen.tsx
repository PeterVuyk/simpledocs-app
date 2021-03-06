import React from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, ListItem } from 'react-native-elements';
import { Asset } from 'expo-asset';
import DocumentationViewScreen from './DocumentationViewScreen';
import getChapterIcon from '../helper/getChapterIcon';
import RegulationsRepository from '../database/RegulationsRepository';

interface RegulationsContent {
  index: number;
  chapter: string;
  level: string;
  title: string;
  // eslint-disable-next-line camelcase
  sub_title: string;
  body: string;
  // eslint-disable-next-line camelcase
  search_text: string;
}

const RegulationsScreen: React.FC = () => {
  const [regulations, setRegulations] = React.useState<RegulationsContent[]>(
    [],
  );

  React.useEffect(() => {
    RegulationsRepository.getChapterSection(setRegulations);
    setRegulations(regulations);
  }, [RegulationsRepository]);

  const navigation = useNavigation();

  const renderItem = (item: RegulationsContent) => (
    <ListItem
      bottomDivider
      onPress={event =>
        navigation.navigate('DocumentationViewScreen', {
          regulationsContentChapter: item.chapter,
        })
      }
    >
      <Avatar
        source={{
          uri: Asset.fromModule(getChapterIcon(item.chapter)).uri,
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.sub_title}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <View style={{ flex: 1 }}>
      {regulations && (
        <FlatList<RegulationsContent>
          data={regulations}
          renderItem={({ item }) => renderItem(item)}
        />
      )}
    </View>
  );
};

export default RegulationsScreen;
