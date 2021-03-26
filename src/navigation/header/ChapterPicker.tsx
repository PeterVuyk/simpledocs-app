import * as React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';
import regulationRepository, {
  Chapter,
} from '../../database/repository/regulationRepository';
import regulations from '../../redux/actions/regulations';

interface Props {
  currentRegulationsChapter: string;
  setCurrentRegulationsChapter: (currentRegulationsChapter: string) => void;
}

const ChapterPicker: React.FC<Props> = ({
  currentRegulationsChapter,
  setCurrentRegulationsChapter,
}) => {
  const [chapters, setChapters] = React.useState<Chapter[]>([]);

  React.useEffect(() => {
    regulationRepository.getChapters(setChapters);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {currentRegulationsChapter !== '' && (
        <Picker
          selectedValue={currentRegulationsChapter}
          onValueChange={(itemValue, itemIndex) =>
            setCurrentRegulationsChapter(itemValue.toString())
          }
        >
          {chapters.map(value => (
            <Picker.Item
              label={`${value.chapter}: ${value.title}`}
              value={value.chapter}
              key={value.chapter.toString()}
            />
          ))}
        </Picker>
      )}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    currentRegulationsChapter:
      state.currentRegulationsChapter.currentRegulationsChapter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentRegulationsChapter: key =>
      dispatch(regulations.setCurrentRegulationsChapter(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChapterPicker);
