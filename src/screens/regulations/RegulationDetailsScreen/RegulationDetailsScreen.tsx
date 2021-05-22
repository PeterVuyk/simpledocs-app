import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { View, FlatList, Dimensions } from 'react-native';
import RegulationDetailItem from './RegulationDetailItem';
import regulationRepository, {
  Chapter,
} from '../../../database/repository/regulationRepository';

interface Props {
  route: RouteProp<
    {
      params: {
        regulationChapter: string;
      };
    },
    'params'
  >;
}

const RegulationDetailsScreen: React.FC<Props> = ({ route }) => {
  const [chapters, setChapters] = React.useState<Chapter[]>([]);

  const { regulationChapter } = route.params;
  const { width } = Dimensions.get('window');

  React.useEffect(() => {
    regulationRepository.getChapters(setChapters);
  }, []);

  const getInitialPageIndex = () => {
    const index = chapters
      .map(chapter => chapter.chapter)
      .indexOf(regulationChapter);
    return index === -1 ? -1 : index;
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        maxToRenderPerBatch={1}
        initialNumToRender={1}
        windowSize={1}
        data={chapters}
        initialScrollIndex={getInitialPageIndex()}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        keyExtractor={item => item.chapter.toString()}
        renderItem={({ item }) => (
          <View style={{ width, flex: 1 }}>
            <RegulationDetailItem regulationChapter={item.chapter} />
          </View>
        )}
      />
    </View>
  );
};

export default RegulationDetailsScreen;
