import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const InfoScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>InfoScreen</Text>
      <Image
        /* eslint-disable-next-line global-require */
        source={require('../assets/background.png')}
        style={{ position: 'absolute', resizeMode: 'contain', opacity: 0.4 }}
        blurRadius={4}
      />
    </View>
  );
};

export default InfoScreen;
