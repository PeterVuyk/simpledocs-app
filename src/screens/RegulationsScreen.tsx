import React from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, ListItem } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import RegulationRepository, {
  Regulation,
} from '../database/repository/regulationRepository';

const RegulationsScreen: React.FC = () => {
  const [regulations, setRegulations] = React.useState<Regulation[]>([]);

  React.useEffect(() => {
    RegulationRepository.getChaptersSection(setRegulations);
  }, []);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const renderItem = (item: Regulation) => (
    <ListItem
      bottomDivider
      onPress={() =>
        navigation.push('RegulationDetailsScreen', {
          regulationChapter: item.chapter,
        })
      }
    >
      <Avatar
        source={{
          uri: `data:image/png;base64,${item.icon}`,
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.sub_title}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={{ flex: 1, marginBottom: 50 }}>
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
