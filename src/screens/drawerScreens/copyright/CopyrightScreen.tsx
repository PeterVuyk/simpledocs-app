import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
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
  navigation: DrawerNavigationHelpers;
  appConfigurations: AppConfigurations;
}

const CopyrightScreen: FC<Props> = ({ navigation, appConfigurations }) => {
  return (
    <DrawerScreen
      appConfigurations={appConfigurations}
      navigation={navigation}
      showHeader
    >
      <View style={styles.container}>
        <TitleBar
          title="Auteursrechten"
          subTitle="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,
         adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,
          adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,
           adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,
             adipisci velit. "
        />
      </View>
    </DrawerScreen>
  );
};

export default CopyrightScreen;
