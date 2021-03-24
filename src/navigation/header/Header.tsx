import * as React from 'react';
import { Image, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import { useEffect } from 'react';
import DrawerButton from './DrawerButton';
import SearchButton from './SearchButton';
import ChapterPicker from './ChapterPicker';
import { Chapter } from '../../database/repository/regulationRepository';

interface Props {
  children: React.ReactNode;
  navigation: DrawerNavigationProp<any>;
  chapters?: Chapter[];
  scrollToChapter?: (chapter: string) => void;
  getCurrentChapter?: () => string;
}

const Header: React.FC<Props> = ({
  children,
  navigation,
  chapters,
  scrollToChapter,
  getCurrentChapter,
}) => {
  useEffect(() => console.log(getCurrentChapter), [getCurrentChapter]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 50,
        height: 125,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        backgroundColor: '#fff',
      }}
    >
      <DrawerButton
        drawerStyle={{ marginLeft: 10, marginTop: 40 }}
        navigation={navigation}
      />
      {chapters && scrollToChapter && getCurrentChapter && (
        <ChapterPicker
          chapters={chapters}
          scrollToChapter={scrollToChapter}
          getCurrentChapter={getCurrentChapter}
        />
      )}
      {!chapters && !scrollToChapter && !getCurrentChapter && (
        <Image
          style={{
            marginTop: 10,
            width: 200,
            resizeMode: 'contain',
            alignItems: 'center',
          }}
          source={require('../../../assets/images/azn.png')}
        />
      )}
      <SearchButton
        searchButtonStyle={{
          alignSelf: 'flex-end',
          marginRight: 10,
          marginBottom: 10,
        }}
        navigation={navigation}
      />
      {children}
    </View>
  );
};

export default Header;
