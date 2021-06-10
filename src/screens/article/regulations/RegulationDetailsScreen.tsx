import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import articleRepository from '../../../database/repository/articleRepository';
import { ArticleChapter } from '../../../database/model/ArticleChapter';
import ArticleDetails from '../ArticleDetails';

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

const RegulationDetailsScreen: React.FC<Props> = ({ route }) => {
  const [chapters, setChapters] = useState<ArticleChapter[]>([]);
  const { articleChapter } = route.params;

  useEffect(() => {
    articleRepository.getChapters('regulations', setChapters);
  }, []);

  return (
    <ArticleDetails
      articleType="regulations"
      articleChapterList={chapters}
      articleChapter={articleChapter}
    />
  );
};

export default RegulationDetailsScreen;
