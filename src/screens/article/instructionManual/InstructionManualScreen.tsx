import React, { useEffect, useState } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import ArticlesList from '../ArticlesList';
import { Article } from '../../../database/model/Article';
import articleRepository from '../../../database/repository/articleRepository';

interface Props {
  navigation: DrawerNavigationProp<any>;
}

const InstructionManualScreen: React.FC<Props> = ({ navigation }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    articleRepository.getParagraphs('instructionManual', setArticles);
  }, []);

  return (
    <>
      {articles && (
        <ArticlesList
          navigation={navigation}
          articles={articles}
          articleType="instructionManual"
        />
      )}
    </>
  );
};

export default InstructionManualScreen;
