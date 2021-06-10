import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import ArticleDetailItem from './ArticleDetailItem';
import { ArticleChapter } from '../../database/model/ArticleChapter';
import { ArticleType } from '../../database/model/ArticleType';

interface Props {
  articleChapter: string;
  articleType: ArticleType;
  articleChapterList: ArticleChapter[];
}

const ArticleDetails: React.FC<Props> = ({
  articleChapter,
  articleChapterList,
  articleType,
}) => {
  const { width } = Dimensions.get('window');
  const getInitialPageIndex = () => {
    const index = articleChapterList
      .map(chapter => chapter.chapter)
      .indexOf(articleChapter);
    return index === -1 ? -1 : index;
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        nestedScrollEnabled
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        maxToRenderPerBatch={1}
        initialNumToRender={1}
        windowSize={1}
        data={articleChapterList}
        initialScrollIndex={getInitialPageIndex()}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        keyExtractor={item => item.chapter.toString()}
        renderItem={({ item }) => (
          <View style={{ width, flex: 1 }}>
            <ArticleDetailItem
              articleChapter={item.chapter}
              articleType={articleType}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ArticleDetails;
