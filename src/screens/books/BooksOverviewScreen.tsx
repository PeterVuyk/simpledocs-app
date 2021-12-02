import React, { FC, useCallback } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import { FlatList, StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { SECOND_BOOK_TAB } from '../../model/BottomTab';
import TitleBar from '../../components/titleBar/TitleBar';
import ListItem from '../../components/listItem/ListItem';
import {
  BookInfo,
  BookTabInfo,
} from '../../model/configurations/AppConfigurations';
import globalStyle from '../../styling/globalStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.color.white,
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
        bookTabInfo: BookTabInfo;
        currentTab: string;
      };
    },
    'params'
  >;
}

const BooksOverviewScreen: FC<Props> = ({ navigation, route }) => {
  const { bookTabInfo, currentTab } = route.params;

  const navigate = useCallback(
    (bookType: string) => {
      if (currentTab === SECOND_BOOK_TAB) {
        navigation.navigate('SecondBookTabStack', {
          screen: 'SecondBookTabPageScreen',
          params: { bookType, bookTabInfo },
        });
        return;
      }
      navigation.navigate('FirstBookTabStack', {
        screen: 'FirstBookTabPageScreen',
        params: { bookType, bookTabInfo },
      });
    },
    [currentTab, navigation, bookTabInfo],
  );

  const renderItem = useCallback(
    (item: BookInfo) => (
      <ListItem
        title={item.title ?? ''}
        subTitle={item.subTitle}
        iconFile={item.iconFile ?? ''}
        bookmarked={false}
        onSubmit={() => navigate(item.bookType)}
      />
    ),
    [navigate],
  );

  const getHeader = () => {
    return (
      <TitleBar
        title={bookTabInfo.title ?? ''}
        subTitle={bookTabInfo.subTitle ?? ''}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          ListHeaderComponent={getHeader}
          keyExtractor={item => item.bookType.toString()}
          data={bookTabInfo.bookTypes.sort((a, b) => a.index - b.index)}
          renderItem={({ item }) => renderItem(item)}
        />
      </View>
    </View>
  );
};

export default BooksOverviewScreen;