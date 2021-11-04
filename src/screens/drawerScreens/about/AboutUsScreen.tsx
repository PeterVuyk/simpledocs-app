import React, { FC } from 'react';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { StyleSheet, View } from 'react-native';
import TitleBar from '../../../components/TitleBar';
import { AppConfigurations } from '../../../model/AppConfigurations';
import DrawerScreen from '../DrawerScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 60,
  },
});

interface Props {
  appConfigurations: AppConfigurations;
  navigation: DrawerNavigationHelpers;
}

const AboutUsScreen: FC<Props> = ({ navigation, appConfigurations }) => {
  return (
    <DrawerScreen
      showHeader
      appConfigurations={appConfigurations}
      navigation={navigation}
    >
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
    </DrawerScreen>
  );
};

export default AboutUsScreen;
