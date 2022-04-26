import React, { FC, Fragment, useCallback } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import { ScrollView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { FIRST_BOOK_TAB, SECOND_BOOK_TAB } from '../../model/BottomTab';
import TitleBar from '../../components/titleBar/TitleBar';
import { BookTabInfo } from '../../model/configurations/AppConfigurations';
import globalStyle from '../../styling/globalStyle';
import BooksOverviewCardItem from './BooksOverviewCardItem';
import ScreenContainer from '../../components/ScreenContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
    backgroundColor: globalStyle.color.white,
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

  const handleNavigation = useCallback(
    (bookType: string) => {
      if (currentTab === FIRST_BOOK_TAB) {
        navigation.navigate('FirstBookTabStack', {
          screen: 'FirstBookTabPageScreen',
          params: { bookType, bookTabInfo },
        });
        return;
      }
      if (currentTab === SECOND_BOOK_TAB) {
        navigation.navigate('SecondBookTabStack', {
          screen: 'SecondBookTabPageScreen',
          params: { bookType, bookTabInfo },
        });
        return;
      }
      navigation.navigate('ThirdBookTabStack', {
        screen: 'ThirdBookTabPageScreen',
        params: { bookType, bookTabInfo },
      });
    },
    [currentTab, navigation, bookTabInfo],
  );

  return (
    <ScreenContainer>
      <ScrollView style={styles.container}>
        <TitleBar
          title={bookTabInfo.title ?? ''}
          subTitle={bookTabInfo.subTitle ?? ''}
          bottomDivider
        />
        {bookTabInfo.bookTypes
          .sort((a, b) => a.index - b.index)
          .map((book, index) => (
            <Fragment key={book.bookType}>
              <BooksOverviewCardItem
                lastItem={index === bookTabInfo.bookTypes.length - 1}
                bookInfo={book}
                onNavigation={handleNavigation}
              />
            </Fragment>
          ))}
      </ScrollView>
    </ScreenContainer>
  );
};

export default BooksOverviewScreen;
