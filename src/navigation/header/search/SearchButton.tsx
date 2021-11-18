import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { Icon } from 'native-base';
import globalStyle from '../../../styling/globalStyle';

const styles = StyleSheet.create({
  buttonColor: {
    color: globalStyle.color.primary.main,
    padding: 10,
  },
  buttonColorDisabled: {
    color: globalStyle.color.secondary.main,
    padding: 10,
  },
});

interface Props {
  navigation?: DrawerNavigationHelpers;
}

const SearchButton: FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Icon
        name="magnify"
        style={[navigation ? styles.buttonColor : styles.buttonColorDisabled]}
        type="MaterialCommunityIcons"
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
