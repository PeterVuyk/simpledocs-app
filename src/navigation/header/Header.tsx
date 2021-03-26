import * as React from 'react';
import { View } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import DrawerButton from './DrawerButton';
import SearchButton from './SearchButton';

interface Props {
  children: React.ReactNode;
  navigation: DrawerNavigationHelpers;
}

const Header: React.FC<Props> = ({ navigation, children }) => {
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
      {children}
      <SearchButton
        searchButtonStyle={{
          alignSelf: 'flex-end',
          marginRight: 10,
          marginBottom: 10,
        }}
        navigation={navigation}
      />
    </View>
  );
};

export default Header;
