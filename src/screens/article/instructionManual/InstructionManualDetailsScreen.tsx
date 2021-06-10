import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { View } from 'react-native';
import articleRepository from '../../../database/repository/articleRepository';
import { ArticleChapter } from '../../../database/entity/ArticleChapter';
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

const InstructionManualDetailsScreen: React.FC<Props> = ({ route }) => {
  const [chapters, setChapters] = useState<ArticleChapter[]>([]);
  const { articleChapter } = route.params;

  useEffect(() => {
    articleRepository.getChapters('instructionManual', setChapters);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ArticleDetails
        articleType="instructionManual"
        articleChapterList={chapters}
        articleChapter={articleChapter}
      />
    </View>
  );
};

export default InstructionManualDetailsScreen;
