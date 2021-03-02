import React from 'react';
import {
  FlatList,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Avatar, Button, ListItem} from 'react-native-elements';
import { Asset } from 'expo-asset';
import DocumentationViewScreen from './DocumentationViewScreen';
import getHeadingIcon from '../helper/getHeadingIcon';
import HighlightWords from '../components/HighlightWords';
import RegulationsRepository from "../database/RegulationsRepository";

interface RegulationsContent {
  id: number;
  index: number;
  heading: string;
  level: string;
  title: string;
  // eslint-disable-next-line camelcase
  sub_title: string;
  body: string;
  // eslint-disable-next-line camelcase
  search_text: string;
}

const RegulationsScreen: React.FC = () => {
  const isMounted = React.useRef(false);
  const [regulations, setRegulations] = React.useState<RegulationsContent[]>(
    [],
  );

  React.useEffect(() => {
    RegulationsRepository.getHeading(setRegulations);
    setRegulations(regulations);
  }, [RegulationsRepository]);

  const navigation = useNavigation();

  const renderItem = (item: RegulationsContent) => (
    <ListItem
      bottomDivider
      onPress={event =>
        navigation.navigate('DocumentationViewScreen', {
          regulationsContentId: item.id,
        })
      }
    >
      <Avatar
        source={{
          uri: Asset.fromModule(getHeadingIcon(item.heading)).uri,
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
