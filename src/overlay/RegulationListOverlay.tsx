import React from 'react';
import {
  Avatar,
  Button,
  ListItem,
  Overlay,
} from 'react-native-elements';
import { View, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import regulationRepository, {
  Chapter,
} from '../database/repository/regulationRepository';

interface Props {
  visible: boolean;
  toggleOverlay: () => void;
}

const RegulationListOverlay: React.FC<Props> = ({ visible, toggleOverlay }) => {
  const [chapters, setChapters] = React.useState<Chapter[]>([]);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const { width, height } = Dimensions.get('window');

  React.useEffect(() => {
    regulationRepository.getChapters(setChapters);
  }, []);

  const renderItem = (item: Chapter) => (
    <ListItem
      bottomDivider
      onPress={() => {
        toggleOverlay();
        navigation.push('RegulationDetailsScreen', {
          regulationChapter: item.chapter,
        });
      }}
    >
      <Avatar
        size={30}
        source={{
          uri: `data:image/png;base64,${item.icon}`,
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View
      style={{
        position: 'absolute',
        flex: 1,
        width,
        height,
      }}
    >
      <Overlay fullScreen isVisible={visible} onBackdropPress={toggleOverlay}>
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
