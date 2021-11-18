import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import TitleBar from '../../../components/titleBar/TitleBar';
import { AppConfigurations } from '../../../model/configurations/AppConfigurations';
import DrawerScreen from '../DrawerScreen';
import globalStyle from '../../../styling/globalStyle';

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: globalStyle.color.white,
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
      <View style={styles.tabContainer}>
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
