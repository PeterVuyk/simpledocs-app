import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  navigation: DrawerNavigationProp<any>;
}

const InfoScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text selectable style={{ textAlign: 'center' }}>
        <Text style={{ fontWeight: 'bold' }}>Ambulancezorg Nederland</Text>
        {'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Bezoekadres</Text>
        {'\n'}
        <Text>Postbus 489</Text>
        {'\n'}
        <Text>8000 AL Zwolle</Text>
        {'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Postadres</Text>
        {'\n'}
        <Text>Veerallee 68</Text>
        {'\n'}
        <Text>8019 AE Zwolle</Text>
        {'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Contact</Text>
        {'\n'}
        <Text>088 38 38 200</Text>
        {'\n'}
        <Text>info@ambulancezorg.nl</Text>
      </Text>
    </View>
  );
};

export default InfoScreen;
