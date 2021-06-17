import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
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
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    articleRepository.getChapters('regulations', setChapters);
  }, [navigation]);

  return (
    <ArticleDetails
      articleType="regulations"
      articleChapterList={chapters}
      articleChapter={articleChapter}
    />
  );
};

export default RegulationDetailsScreen;
