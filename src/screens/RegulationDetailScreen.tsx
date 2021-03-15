import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { View, FlatList, Dimensions } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import RegulationDetails from '../components/RegulationDetails';
import regulationRepository from '../database/repository/regulationRepository';

interface SearchText {
  chapter: string;
  searchText: string;
}

interface Props {
  route: RouteProp<
    {
      params: {
        regulationChapter: string;
        searchText?: SearchText;
      };
    },
    'params'
  >;
}

const RegulationDetailScreen: React.FC<Props> = route => {
  const [chapters, setChapters] = React.useState<string[]>([]);

  const { regulationChapter, searchText } = route.route.params;
  const headerHeight = useHeaderHeight();
  const { width, height } = Dimensions.get('window');

  React.useEffect(() => {
    regulationRepository.getChapters(setChapters);
  }, []);

  const getHeight = () => {
    return height - headerHeight;
  };

  const getPageIndex = () => {
    const pageIndex = chapters.indexOf(regulationChapter);
    return pageIndex === -1 ? 0 : pageIndex;
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
        removeClippedSubviews
        data={chapters}
        initialScrollIndex={getPageIndex()}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        keyExtractor={item => item.toString()}
        renderItem={({ item }) => (
          <View style={{ width, height: getHeight() }}>
            <RegulationDetails
              regulationChapter={item}
              searchText={searchText}
            />
          </View>
        )}
      />
    </View>
  );
};

export default RegulationDetailScreen;
