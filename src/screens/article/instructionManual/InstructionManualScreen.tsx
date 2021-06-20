import React, { FC, useEffect, useState } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import ArticlesList from '../ArticlesList';
import { Article } from '../../../model/Article';
import articleRepository from '../../../database/repository/articleRepository';
import { ARTICLE_TYPE_INSTRUCTION_MANUAL } from '../../../model/ArticleType';

interface Props {
  navigation: DrawerNavigationProp<any>;
}

const InstructionManualScreen: FC<Props> = ({ navigation }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    articleRepository.getParagraphs(
      ARTICLE_TYPE_INSTRUCTION_MANUAL,
      setArticles,
    );
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
