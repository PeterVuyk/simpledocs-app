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
      <Text style={{ fontWeight: "bold" }}>Ambulancezorg Nederland</Text>
      <Text style={{ fontWeight: "bold", marginTop: 20 }}>Bezoekadres</Text>
      <Text>Postbus 489</Text>
      <Text>8000 AL Zwolle</Text>
      <Text style={{ fontWeight: "bold", marginTop: 20 }}>Postadres</Text>
      <Text>Veerallee 68</Text>
      <Text>8019 AE Zwolle</Text>
      <Text style={{ fontWeight: "bold", marginTop: 20 }}>Contact</Text>
      <Text>088 38 38 200</Text>
      <Text>info@ambulancezorg.nl</Text>
    </View>
  );
};

export default InfoScreen;
