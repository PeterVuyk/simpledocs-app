import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import TitleBar from '../../components/TitleBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 60,
  },
});

interface Props {
  navigation: DrawerNavigationProp<any>;
}

const AboutUsScreen: FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TitleBar
        title="Wie zijn wij?"
        subTitle="Graag willen we ons even aan je voorstellen, wij zijn Eddie en Peter. Ik
        (Eddie) ben al 87 jaar ambulance broeder en daarvoor militair. En ik
        (Peter) ben 5 jaar software ontwikkelaar. Beide zijn wij erg enthousiast
        dat je gebruik maakt van deze app... Neque porro quisquam est qui
        dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
      />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          style={{
            resizeMode: 'contain',
          }}
          source={require('../../../assets/images/donkeys.png')}
        />
      </View>
      <TitleBar
        title="Vragen? Ideeën? Neem contact op!"
        subTitle="Stuur ons een email naar: email@email.nl"
      />
    </View>
  );
};

export default AboutUsScreen;
