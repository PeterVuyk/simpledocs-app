import * as React from 'react';
import { FlatList, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Chapter } from '../../database/repository/regulationRepository';

interface Props {
  chapters: Chapter[];
  scrollToChapter: (chapter: string) => void;
  getCurrentChapter: () => string;
}

const ChapterPicker: React.FC<Props> = ({
  chapters,
  scrollToChapter,
  getCurrentChapter,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <Picker
        selectedValue={getCurrentChapter()}
        onValueChange={(itemValue, itemIndex) =>
          scrollToChapter(itemValue.toString())
        }
      >
        {chapters.map(value => (
          <Picker.Item
            label={value.title}
            value={value.chapter}
            key={value.chapter.toString()}
          />
        ))}
      </Picker>
    </View>
  );
};

export default ChapterPicker;
