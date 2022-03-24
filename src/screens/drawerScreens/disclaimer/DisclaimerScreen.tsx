import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { useIsFocused } from '@react-navigation/native';
import TitleBar from '../../../components/titleBar/TitleBar';
import { AppConfigurations } from '../../../model/configurations/AppConfigurations';
import DrawerScreen from '../DrawerScreen';
import globalStyle from '../../../styling/globalStyle';
import ScreenContainer from '../../../components/ScreenContainer';
import standalonePagesStorage from '../../../storage/standalonePagesStorage';
import { StandalonePage } from '../../../model/standalonePages/StandalonePage';
import { STANDALONE_PAGE_TYPE_DISCLAIMER } from '../../../model/standalonePages/StandalonePageType';
import ContentViewer from '../../../components/viewer/content/ContentViewer';
import logger from '../../../util/logger';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.color.white,
  },
});

interface Props {
  navigation: DrawerNavigationHelpers;
  appConfigurations: AppConfigurations;
}

const DisclaimerScreen: FC<Props> = ({ navigation, appConfigurations }) => {
  const [standalonePage, setStandalonePage] = useState<StandalonePage | null>(
    null,
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    standalonePagesStorage
      .getStandalonePages()
      .then(
        pages =>
          pages.find(
            value =>
              value.standalonePageType === STANDALONE_PAGE_TYPE_DISCLAIMER,
          ) ?? null,
      )
      .then(value => {
        if (value === null) {
          logger.errorFromMessage(
            'User opened disclaimer page but failed to load disclaimer from standalonePages',
          );
          navigation.navigate('FirstBookTabStack', {
            screen: 'FirstBookTabOverviewScreen',
          });
        }
        setStandalonePage(value);
      });
    // We add isFocused to reload the page for disclaimer. Needed in case the user opens this page immediately
    // while the aggregate needs to be updated after startup. and as fallback to make the navigator work
  }, [navigation, isFocused]);

  if (!standalonePage) {
    return null;
  }

  return (
    <ScreenContainer>
      <DrawerScreen
        appConfigurations={appConfigurations}
        navigation={navigation}
        showHeader
      >
        <View style={styles.container}>
          <TitleBar title={standalonePage.title} bottomDivider />
          <ContentViewer
            content={standalonePage.content}
            contentType={standalonePage.contentType}
            bookType="none"
          />
        </View>
      </DrawerScreen>
    </ScreenContainer>
  );
};

export default DisclaimerScreen;
