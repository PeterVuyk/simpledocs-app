import React, { FC } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import { FlatList, StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { SECOND_ARTICLE_TAB } from '../../model/ArticleType';
import TitleBar from '../../components/TitleBar';
import ListItem from '../../components/ListItem';
import { ArticlesInfo } from '../../model/ArticlesInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 60,
  },
});

interface Props {
  navigation: DrawerNavigationProp<any>;
  route: RouteProp<
    {
      params: {
        articlesInfo: ArticlesInfo;
        currentTab: string;
      };
    },
    'params'
  >;
}

const ArticlesOverviewScreen: FC<Props> = ({ navigation, route }) => {
  const { articlesInfo, currentTab } = route.params;

  const navigate = (articleType: string) => {
    if (currentTab === SECOND_ARTICLE_TAB) {
      navigation.navigate('SecondArticleTabStack', {
        screen: 'SecondArticleTabArticleScreen',
        params: { articleType, articlesInfo },
      });
      return;
    }
    navigation.navigate('FirstArticleTabStack', {
      screen: 'FirstArticleTabArticleScreen',
      params: { articleType, articlesInfo },
    });
  };

  return (
    <View style={styles.container}>
      <TitleBar
        title={articlesInfo.title ?? ''}
        subTitle={articlesInfo.subTitle ?? ''}
      />
      <FlatList
        keyExtractor={item => item.articleType.toString()}
        data={articlesInfo.articleTypes}
        renderItem={({ item }) => (
          <ListItem
            title={item.title ?? ''}
            subTitle={item.subTitle}
            iconFile={item.iconFile ?? ''}
            onSubmit={() => navigate(item.articleType)}
          />
        )}
      />
    </View>
  );
};

export default ArticlesOverviewScreen;
