import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
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
        subTitle="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,
         adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,
          adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,
           adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,
             adipisci velit. "
      />
      <TitleBar
        title="Vragen? Ideeën? Neem contact op!"
        subTitle="Stuur ons een email naar: email@email.nl"
      />
    </View>
  );
};

export default AboutUsScreen;
