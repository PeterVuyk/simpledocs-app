import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { View, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import RegulationDetailItem from './RegulationDetailItem';
import regulationRepository, {
  Chapter,
} from '../../database/repository/regulationRepository';
import regulations from '../../redux/actions/regulations';

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
  currentRegulationsChapter: string;
  setCurrentRegulationsChapter: (currentRegulationsChapter: string) => void;
}

const RegulationDetailsScreen: React.FC<Props> = ({
  route,
  currentRegulationsChapter,
  setCurrentRegulationsChapter,
}) => {
  const [chapters, setChapters] = React.useState<Chapter[]>([]);
  const flatListRef = React.createRef<FlatList<Chapter[]>>();

  const { regulationChapter } = route.params;
  const { width } = Dimensions.get('window');

  React.useEffect(() => {
    regulationRepository.getChapters(setChapters);
  }, []);

  React.useEffect(() => {
    return () => {
      setCurrentRegulationsChapter('');
    };
  }, [setCurrentRegulationsChapter]);

  React.useEffect(() => {
    if (chapters.length === 0 || currentRegulationsChapter === '') {
      return;
    }
    const index = chapters
      .map(result => result.chapter)
      .indexOf(currentRegulationsChapter);
    flatListRef?.current?.scrollToIndex({ animated: false, index });
  }, [chapters, currentRegulationsChapter, flatListRef]);

  const getInitialPageIndex = () => {
    const index = chapters
      .map(chapter => chapter.chapter)
      .indexOf(regulationChapter);
    return index === -1 ? -1 : index;
  };

  const onViewableItemsChanged = React.useRef(({ viewableItems, changed }) => {
    if (
      changed === undefined ||
      changed.filter(changed => changed.isViewable).length === 0
    ) {
      return;
    }
    setCurrentRegulationsChapter(changed.filter(result => result.isViewable)[0].item.chapter);
  });

  return (
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
        initialScrollIndex={getInitialPageIndex()}
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
        renderItem={({ item }) => (
          <View style={{ width, flex: 1 }}>
            <RegulationDetailItem
              regulationChapter={item.chapter}
              searchText={route.params.searchText}
            />
          </View>
        )}
      />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegulationDetailsScreen);
