import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { Icon } from 'native-base';

const styles = StyleSheet.create({
  buttonColor: {
    color: '#154594',
    padding: 10,
  },
});

interface Props {
  navigation: DrawerNavigationHelpers;
}

const SearchButton: FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Icon
        name="magnify"
        fontSize={26}
        style={styles.buttonColor}
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
