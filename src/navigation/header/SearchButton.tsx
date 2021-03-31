import React from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

interface Props {
  navigation: DrawerNavigationHelpers;
}

const SearchButton: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <MaterialCommunityIcons
        name="magnify"
        color="#154594"
        size={26}
        onPress={() => {
          navigation.navigate('RegulationsScreenStack', {
            screen: 'SearchScreen',
          });
        }}
      />
    </View>
  );
};

export default SearchButton;
