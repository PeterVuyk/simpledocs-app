import * as React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import regulationRepository, {
  Chapter,
} from '../../database/repository/regulationRepository';

const ChapterPicker: React.FC = () => {
  const [chapters, setChapters] = React.useState<Chapter[]>([]);

  const navigation = useNavigation<StackNavigationProp<any>>();

  React.useEffect(() => {
    regulationRepository.getChapters(setChapters);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Picker
        onValueChange={(itemValue, itemIndex) => {
          if (itemValue !== '-1') {
            navigation.push('RegulationDetailsScreen', {
              regulationChapter: itemValue.toString(),
            });
          }
        }}
      >
        <Picker.Item label="empty" value="-1" key="-1" />
        {chapters.map(value => (
          <Picker.Item
            label={`${value.chapter}: ${value.title}`}
            value={value.chapter}
            key={value.chapter.toString()}
          />
        ))}
      </Picker>
    </View>
  );
};

export default ChapterPicker;
