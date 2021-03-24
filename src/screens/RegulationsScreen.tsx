import React from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import RegulationRepository, {
  Regulation,
} from '../database/repository/regulationRepository';
import Header from '../navigation/header/Header';

interface Props {
  navigation: DrawerNavigationProp<any>;
}

const RegulationsScreen: React.FC<Props> = ({ navigation }) => {
  const [regulations, setRegulations] = React.useState<Regulation[]>([]);

  React.useEffect(() => {
    RegulationRepository.getChaptersSection(setRegulations);
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
    <Header navigation={navigation}>
      <View style={{ flex: 1, marginBottom: 50 }}>
        {regulations && (
          <FlatList<Regulation>
            keyExtractor={item => item.chapter.toString()}
            data={regulations}
            renderItem={({ item }) => renderItem(item)}
          />
        )}
      </View>
    </Header>
  );
};

export default RegulationsScreen;
