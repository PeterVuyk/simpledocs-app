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

const InfoScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Header navigationDrawer={navigation}>
      <View style={styles.container}>
        <Text>InfoScreen</Text>
        <Image
          /* eslint-disable-next-line global-require */
          source={require('../../assets/images/background.png')}
          style={{ position: 'absolute', resizeMode: 'contain', opacity: 0.4 }}
          blurRadius={4}
        />
      </View>
    </Header>
  );
};

export default InfoScreen;
