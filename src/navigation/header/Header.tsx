import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import DrawerButton from './DrawerButton';
import SearchButton from './SearchButton';
import RegulationsListButton from './RegulationsListButton';
import HeaderLogo from './HeaderLogo';

interface Props {
  navigation: DrawerNavigationHelpers;
  showRegulationsListButton?: boolean;
}

const Header: React.FC<Props> = ({ navigation, showRegulationsListButton }) => {
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 40,
        height: 110,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
      }}
    >
      <DrawerButton drawerStyle={{ marginLeft: 10 }} navigation={navigation} />
      <HeaderLogo />
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row-reverse',
          marginLeft: 10,
          marginRight: 20,
          marginBottom: 10,
        }}
      >
        <SearchButton navigation={navigation} />
        {showRegulationsListButton && (
          <RegulationsListButton
            regulationsButtonStyle={{
              marginRight: 20,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
