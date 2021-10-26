import React, { FC, ReactNode, useEffect, useState } from 'react';
import { View } from 'react-native';
import Firebase from '../firebase';
import logger from '../../util/logger';
import NoInternetConnectionOverlay from '../../screens/splash/NoInternetConnectionOverlay';
import internetConnectivity from '../../helper/internetConnectivity';

interface Props {
  children: ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const [authSuccessful, setAuthSuccessful] = useState<boolean>();

  const signIn = async () => {
    if (!(await internetConnectivity.hasInternetConnection())) {
      setAuthSuccessful(false);
      return;
    }
    Firebase.auth()
      .signInAnonymously()
      .then(() => {
        setAuthSuccessful(true);
      })
      .catch(error => {
        logger.error('signing in user as anonymous failed', error.code);
        // TODO: show error page
      });
  };

  useEffect(() => {
    // auth.signOut();
    const unsubscribe = Firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        setAuthSuccessful(true);
        return;
      }
      signIn();
    });
    return unsubscribe;
  }, []);

  if (authSuccessful === undefined) {
    return null;
  }

  if (!authSuccessful) {
    return (
      <View style={{ flex: 1 }}>
        <NoInternetConnectionOverlay onRetryButtonAction={signIn} />
      </View>
    );
  }
  return <>{children}</>;
};

export default AuthProvider;
