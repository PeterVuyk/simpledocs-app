import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

interface Props {
  navigation: DrawerNavigationHelpers;
}

const SearchButton: React.FC<Props> = ({ navigation }) => {
  return (
    <MaterialCommunityIcons
      style={{ marginRight: 10, marginTop: 10 }}
      name="magnify"
      color="#154594"
      size={26}
      onPress={() => navigation.navigate('SearchScreen')}
    />
  );
};

export default SearchButton;
