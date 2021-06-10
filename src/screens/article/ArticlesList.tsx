import React from 'react';
import { FlatList, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import ListItem from '../../components/ListItem';
import { Article } from '../../database/entity/Article';

interface Props {
  navigation: DrawerNavigationProp<any>;
  articles: Article[];
  articleType: 'regulations' | 'instructionManual';
}

const ArticlesList: React.FC<Props> = ({
  navigation,
  articles,
  articleType,
}) => {
  const navigationDetailScreenHandler = (article: Article) => {
    if (articleType === 'regulations') {
      navigation.navigate('RegulationsScreenStack', {
        screen: 'RegulationDetailsScreen',
        params: { articleChapter: article.chapter },
      });
      return;
    }
    navigation.navigate('InstructionManualStackNavigator', {
      screen: 'InstructionManualDetailsScreen',
      params: { articleChapter: article.chapter },
    });
  };

  return (
    <View style={{ flex: 1, paddingBottom: 60, backgroundColor: '#fff' }}>
      <FlatList
        keyExtractor={item => item.chapter.toString()}
        data={articles}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.subTitle}
            iconFile={item.iconFile}
            onSubmit={() => navigationDetailScreenHandler(item)}
          />
        )}
      />
    </View>
  );
};

export default ArticlesList;
