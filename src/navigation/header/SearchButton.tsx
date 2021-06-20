import React, { FC } from 'react';
import { View } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { Icon } from 'native-base';

interface Props {
  navigation: DrawerNavigationHelpers;
}
const SearchButton: FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Icon
        name="magnify"
        fontSize={26}
        style={{ color: '#154594' }}
        type="MaterialCommunityIcons"
        onPress={() => {
          navigation.navigate('SearchStack', {
            screen: 'SearchScreen',
          });
        }}
      />
    </View>
  );
};

export default SearchButton;
