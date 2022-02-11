import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
  children: ReactNode;
}

const BackPressListener: FC<Props> = ({ children }) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const leaveAppConfirmation = useCallback(() => {
    Alert.alert(
      'Sluit de app',
      'Wil je de app verlaten?',
      [
        {
          text: 'Annuleren',
          onPress: () => null,
        },
        { text: 'Verlaten', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: true },
    );
  }, []);

  const canGoBackListener = useCallback(() => {
    if (!navigation.canGoBack()) {
      leaveAppConfirmation();
      return true;
    }
    return false;
  }, [leaveAppConfirmation, navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', canGoBackListener);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', canGoBackListener);
  });

  return <>{children}</>;
};

export default BackPressListener;
