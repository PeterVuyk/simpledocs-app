import React, { FC, useEffect, useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import articleRepository from '../../../database/repository/articleRepository';
import { ArticleChapter } from '../../../model/ArticleChapter';
import ArticleDetails from '../ArticleDetails';
import { ARTICLE_TYPE_REGULATIONS } from '../../../model/ArticleType';

interface Props {
  route: RouteProp<
    {
      params: {
        articleChapter: string;
      };
    },
    'params'
  >;
}

const RegulationDetailsScreen: FC<Props> = ({ route }) => {
  const [chapters, setChapters] = useState<ArticleChapter[]>([]);
  const { articleChapter } = route.params;
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    articleRepository.getChapters(ARTICLE_TYPE_REGULATIONS, setChapters);
  }, [navigation]);

  return (
    <>
      {chapters.length !== 0 && (
        <ArticleDetails
          articleType="regulations"
          articleChapterList={chapters}
          articleChapter={articleChapter}
        />
      )}
    </>
  );
};

export default RegulationDetailsScreen;
