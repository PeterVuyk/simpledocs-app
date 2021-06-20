import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import articleRepository from '../../../database/repository/articleRepository';
import { ArticleChapter } from '../../../model/ArticleChapter';
import ArticleDetails from '../ArticleDetails';
import { ARTICLE_TYPE_INSTRUCTION_MANUAL } from '../../../model/ArticleType';

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

const InstructionManualDetailsScreen: FC<Props> = ({ route }) => {
  const [chapters, setChapters] = useState<ArticleChapter[]>([]);
  const { articleChapter } = route.params;

  useEffect(() => {
    articleRepository.getChapters(ARTICLE_TYPE_INSTRUCTION_MANUAL, setChapters);
  }, []);

  return (
    <ArticleDetails
      articleType="instructionManual"
      articleChapterList={chapters}
      articleChapter={articleChapter}
    />
  );
};

export default InstructionManualDetailsScreen;
