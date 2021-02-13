import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RegulationsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>RegulationsScreen</Text>
      <Image
        source={{
          uri:
            'https://www.ambulancezorg.nl/static/upload/banner/e4e60758-0ce5-4d8e-ab4f-4b4378796f6c/_MG_6220.jpg',
        }}
        // TODO: Require from assets: source={require('../../assets/background.png')}
        style={{ position: 'absolute', resizeMode: 'contain', opacity: 0.4 }}
        blurRadius={4}
      />
    </View>
  );
};

export default RegulationsScreen;
