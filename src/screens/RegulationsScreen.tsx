import React from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, ListItem } from 'react-native-elements';
import { Asset } from 'expo-asset';
import getChapterIcon from '../helper/getChapterIcon';
import RegulationRepository, {
  Regulation,
} from '../database/regulationRepository';

const RegulationsScreen: React.FC = () => {
  const [regulations, setRegulations] = React.useState<Regulation[]>([]);

  React.useEffect(() => {
    RegulationRepository.getChaptersSection(setRegulations);
  }, []);

  const navigation = useNavigation();

  const renderItem = (item: Regulation) => (
    <ListItem
      bottomDivider
      onPress={() =>
        navigation.navigate('RegulationDetailsScreen', {
          regulationChapter: item.chapter,
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
