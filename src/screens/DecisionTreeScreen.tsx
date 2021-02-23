import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Header from '../navigation/header/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  navigation: DrawerNavigationHelpers;
}

const DecisionTreeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Header navigationDrawer={navigation}>
      <View style={styles.container}>
        <Image
          /* eslint-disable-next-line global-require */
          source={require('../../assets/images/background.png')}
          style={{ position: 'absolute', resizeMode: 'contain', opacity: 0.4 }}
          blurRadius={4}
        />
        <Text>DecisionTreeScreen</Text>
      </View>
    </Header>
  );
};

export default DecisionTreeScreen;
