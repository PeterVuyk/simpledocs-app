import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { View, FlatList, ScaledSize } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { ArticleChapter } from '../../../model/articles/ArticleChapter';
import { NOTIFICATION_TYPE_HORIZONTAL_SCROLL_TIP } from '../../../model/notifications/NotificationType';
import BookChapterNavigator from '../BookChapterNavigator';
import useNotification from '../../../components/notification/useNotification';
import BookmarkToggle from '../../bookmarks/BookmarkToggle';
import ArticleDetailsPage from './ArticleDetailsPage';

interface Props {
  articleChapter: string;
  bookType: string;
  articleChapterList: ArticleChapter[];
  windowWidth: ScaledSize;
}

const ArticleDetails: FC<Props> = ({
  articleChapter,
  articleChapterList,
  bookType,
  windowWidth,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>();
  const { notify } = useNotification();
  const isFocused = useIsFocused();

  const handleArticleNavigation = useCallback(
    (chapter: string) => {
      const index = articleChapterList
        .map(value => value.chapter)
        .indexOf(chapter);
      setCurrentIndex(index === -1 ? 1 : index);
    },
    [articleChapterList],
  );

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      notify(NOTIFICATION_TYPE_HORIZONTAL_SCROLL_TIP);
    }
    return () => {
      isMounted = false;
    };
  }, [notify]);

  useEffect(() => {
    const index = articleChapterList
      .map(value => value.chapter)
      .indexOf(articleChapter);
    setCurrentIndex(index === -1 ? 1 : index);
  }, [articleChapter, articleChapterList, handleArticleNavigation]);

  const onPageChange = (chapter: string): void => {
    setCurrentIndex(
      articleChapterList.map(value => value.chapter).indexOf(chapter),
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {isFocused && currentIndex !== undefined && (
        <>
          <BookmarkToggle articleChapter={articleChapterList[currentIndex]} />
          <BookChapterNavigator
            onPageChange={onPageChange}
            articleChapterList={articleChapterList}
            currentChapter={articleChapterList[currentIndex].chapter}
          />
          <ArticleDetailsPage
            currentChapter={articleChapterList[currentIndex].chapter}
            bookType={bookType}
            articleChapterList={articleChapterList}
            windowWidth={windowWidth}
            onPageChange={onPageChange}
          />
        </>
      )}
    </View>
  );
};

export default ArticleDetails;
