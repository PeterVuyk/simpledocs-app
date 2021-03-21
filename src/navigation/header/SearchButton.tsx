import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  navigation: DrawerNavigationProp<any>;
  searchButtonStyle: StyleProp<ViewStyle>;
}

const SearchButton: React.FC<Props> = ({ navigation, searchButtonStyle }) => {
  return (
    <MaterialCommunityIcons
      style={searchButtonStyle}
      name="magnify"
      color="#154594"
      size={26}
      onPress={() => navigation.navigate('SearchScreen')}
    />
  );
};

export default SearchButton;
