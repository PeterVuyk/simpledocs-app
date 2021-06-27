import React, { FC, useEffect, useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import articleRepository from '../../database/repository/articleRepository';
import { ArticleChapter } from '../../model/ArticleChapter';
import ArticleDetails from './ArticleDetails';
import { ArticleType } from '../../model/ArticleType';

interface Props {
  route: RouteProp<
    {
      params: {
        articleChapter: string;
        articleType: ArticleType;
      };
    },
    'params'
  >;
}

const ArticleDetailsScreen: FC<Props> = ({ route }) => {
  const [chapters, setChapters] = useState<ArticleChapter[]>([]);
  const { articleType, articleChapter } = route.params;
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    articleRepository.getChapters(articleType, setChapters);
  }, [articleType, navigation]);

  return (
    <>
      {chapters.length !== 0 && (
        <ArticleDetails
          articleType={articleType}
          articleChapterList={chapters}
          articleChapter={articleChapter}
        />
      )}
    </>
  );
};

export default ArticleDetailsScreen;
