import React, { FC } from 'react';
import { View } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { Icon } from 'native-base';
import globalStyle from '../../../styling/globalStyle';
import getFamilyIcon from '../../../components/getFamilyIcon';

interface Props {
  navigation?: DrawerNavigationHelpers;
}

const SearchButton: FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Icon
        size="7"
        style={{ margin: 10 }}
        color={
          navigation
            ? globalStyle.color.primary.main
            : globalStyle.color.default.main
        }
        as={getFamilyIcon('MaterialCommunityIcons', 'magnify')}
        onPress={() => {
          if (navigation) {
            navigation.navigate('SearchScreen');
          }
        }}
      />
    </View>
  );
};

export default SearchButton;
