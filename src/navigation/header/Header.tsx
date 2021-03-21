import * as React from 'react';
import { Image, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import DrawerButton from './DrawerButton';
import SearchButton from './SearchButton';

interface Props {
  children: React.ReactNode;
  navigation: DrawerNavigationProp<any>;
}

const Header: React.FC<Props> = ({ children, navigation }) => {
  return (
    <View style={{ flex: 1 }}>
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
        <Image
          style={{
            marginTop: 10,
            width: 200,
            resizeMode: 'contain',
            alignItems: 'center',
          }}
          source={require('../../../assets/images/azn.png')}
        />
        <SearchButton
          searchButtonStyle={{
            alignSelf: 'flex-end',
            marginRight: 10,
            marginBottom: 10,
          }}
          navigation={navigation}
        />
      </View>
      {children}
    </View>
  );
};

export default Header;
