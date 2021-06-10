import React from 'react';
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
        articleType: 'regulations' | 'instructionManual';
      };
    },
    'params'
  >;
}

const RegulationDetailsScreen: React.FC<Props> = ({ route }) => {
  const [chapters, setChapters] = React.useState<ArticleChapter[]>([]);
  const { articleChapter, articleType } = route.params;

  React.useEffect(() => {
    articleRepository.getChapters(articleType, setChapters);
  }, [articleType]);

  return (
    <View style={{ flex: 1 }}>
      <ArticleDetails
        articleType={articleType}
        articleChapterList={chapters}
        articleChapter={articleChapter}
      />
    </View>
  );
};

export default RegulationDetailsScreen;
