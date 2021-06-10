import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import ArticlesList from '../ArticlesList';
import { Article } from '../../../database/entity/Article';
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
    <View style={{ flex: 1, paddingBottom: 60, backgroundColor: '#fff' }}>
      {articles && (
        <ArticlesList
          navigation={navigation}
          articles={articles}
          articleType="instructionManual"
        />
      )}
    </View>
  );
};

export default InstructionManualScreen;
