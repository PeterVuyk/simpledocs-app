import React, { FC } from 'react';
import { FlatList, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import ListItem from '../../components/ListItem';
import { Article } from '../../model/Article';
import { ArticleType } from '../../model/ArticleType';
import navigationHelper from '../../helper/navigationHelper';

interface Props {
  navigation: DrawerNavigationProp<any>;
  articles: Article[];
  articleType: ArticleType;
}

const ArticlesList: FC<Props> = ({ navigation, articles, articleType }) => {
  const navigationDetailScreenHandler = (article: Article) => {
    navigationHelper.navigateToChapter(
      { articleChapter: article.chapter },
      articleType,
      navigation,
    );
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
