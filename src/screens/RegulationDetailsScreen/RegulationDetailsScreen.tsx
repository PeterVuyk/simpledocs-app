import React from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { View, FlatList, Dimensions } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import RegulationDetailItem from './RegulationDetailItem';
import regulationRepository, {
  Chapter,
} from '../../database/repository/regulationRepository';
import Header from '../../navigation/header/Header';

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

const RegulationDetailsScreen: React.FC<Props> = route => {
  const [chapters, setChapters] = React.useState<Chapter[]>([]);
  const [currentChapter, setCurrentChapter] = React.useState<string>('1');
  const flatListRef = React.createRef<FlatList<Chapter[]>>();

  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { searchText } = route.route.params;
  const { width } = Dimensions.get('window');

  React.useEffect(() => {
    regulationRepository.getChapters(setChapters);
  }, []);

  React.useEffect(() => {
    const { regulationChapter } = route.route.params;
    setCurrentChapter(regulationChapter);
  }, [route.route.params]);

  const scrollToChapter = (chapter: string) => {
    const index = chapters.map(result => result.chapter).indexOf(chapter);
    flatListRef.current.scrollToIndex({ animated: false, index });
  };

  const getPageIndex = () => {
    const index = chapters
      .map(chapter => chapter.chapter)
      .indexOf(currentChapter);
    return index === -1 ? 0 : index;
  };

  const onViewableItemsChanged = React.useRef(({ viewableItems, changed }) => {
    if (changed === undefined || changed.chapter === undefined) {
      return;
    }
    setCurrentChapter(changed.chapter);
  });

  const getCurrentChapter = () => {
    return currentChapter;
  };

  return (
    <Header
      chapters={chapters}
      scrollToChapter={scrollToChapter}
      navigation={navigation}
      getCurrentChapter={getCurrentChapter}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          ref={flatListRef}
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
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          keyExtractor={item => item.chapter.toString()}
          renderItem={({item}) => (
            <View style={{width, flex: 1}}>
              <RegulationDetailItem
                regulationChapter={item.chapter}
                searchText={searchText}
              />
            </View>
          )}
        />
      </View>
    </Header>
  );
};

export default RegulationDetailsScreen;
