import React, { FC } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import { FlatList, StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { SECOND_BOOK_TAB } from '../../model/BookTab';
import TitleBar from '../../components/TitleBar';
import ListItem from '../../components/ListItem';
import { TabInfo } from '../../model/ConfigInfo';

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
        tabInfo: TabInfo;
        currentTab: string;
      };
    },
    'params'
  >;
}

const BooksOverviewScreen: FC<Props> = ({ navigation, route }) => {
  const { tabInfo, currentTab } = route.params;

  const navigate = (bookType: string) => {
    if (currentTab === SECOND_BOOK_TAB) {
      navigation.navigate('SecondBookTabStack', {
        screen: 'SecondBookTabArticleScreen',
        params: { bookType, tabInfo },
      });
      return;
    }
    navigation.navigate('FirstBookTabStack', {
      screen: 'FirstBookTabArticleScreen',
      params: { bookType, tabInfo },
    });
  };

  return (
    <View style={styles.container}>
      <TitleBar title={tabInfo.title ?? ''} subTitle={tabInfo.subTitle ?? ''} />
      <FlatList
        keyExtractor={item => item.bookType.toString()}
        data={tabInfo.bookTypes}
        renderItem={({ item }) => (
          <ListItem
            title={item.title ?? ''}
            subTitle={item.subTitle}
            iconFile={item.iconFile ?? ''}
            onSubmit={() => navigate(item.bookType)}
          />
        )}
      />
    </View>
  );
};

export default BooksOverviewScreen;
