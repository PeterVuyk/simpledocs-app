import React, { FC, useCallback } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import { FlatList, StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { SECOND_BOOK_TAB } from '../../model/BookTab';
import TitleBar from '../../components/TitleBar';
import ListItem from '../../components/ListItem';
import { BookInfo, TabInfo } from '../../model/AppConfigurations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListContainer: {
    flex: 1,
    paddingBottom: 60,
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

  const navigate = useCallback(
    (bookType: string) => {
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
    },
    [currentTab, navigation, tabInfo],
  );

  const renderItem = useCallback(
    (item: BookInfo) => (
      <ListItem
        title={item.title ?? ''}
        subTitle={item.subTitle}
        iconFile={item.iconFile ?? ''}
        onSubmit={() => navigate(item.bookType)}
      />
    ),
    [navigate],
  );

  const getHeader = () => {
    return (
      <TitleBar title={tabInfo.title ?? ''} subTitle={tabInfo.subTitle ?? ''} />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          ListHeaderComponent={getHeader}
          keyExtractor={item => item.bookType.toString()}
          data={tabInfo.bookTypes.sort((a, b) => a.index - b.index)}
          renderItem={({ item }) => renderItem(item)}
        />
      </View>
    </View>
  );
};

export default BooksOverviewScreen;
