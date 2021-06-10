import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { View, FlatList, Dimensions } from 'react-native';
import RegulationDetailItem from './RegulationDetailItem';
import articleRepository from '../../../database/repository/articleRepository';
import { ArticleChapter } from '../../../database/entity/ArticleChapter';

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
  const [chapters, setChapters] = React.useState<ArticleChapter[]>([]);

  const { regulationChapter } = route.params;
  const { width } = Dimensions.get('window');

  React.useEffect(() => {
    articleRepository.getChapters(setChapters);
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
        nestedScrollEnabled
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
