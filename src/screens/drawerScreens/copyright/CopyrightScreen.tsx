import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import TitleBar from '../../../components/titleBar/TitleBar';
import { AppConfigurations } from '../../../model/configurations/AppConfigurations';
import DrawerScreen from '../DrawerScreen';
import globalStyle from '../../../styling/globalStyle';
import ScreenContainer from '../../../components/ScreenContainer';

const styles = StyleSheet.create({
  container: {
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
    <ScreenContainer>
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
    </ScreenContainer>
  );
};

export default CopyrightScreen;
