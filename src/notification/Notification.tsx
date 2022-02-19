import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import usePushNotifications from './usePushNotifications';
import registerAndGeneratePushNotificationsToken from './registerAndGeneratePushNotificationsToken';
import notificationToggle from './notificationToggle';
import logger from '../util/logger';
import internetConnectivity from '../helper/internetConnectivity';
import hasExpoPushToken from './hasExpoPushToken';

interface Props {
  children: ReactNode;
}
const Notification: FC<Props> = ({ children }) => {
  const { notification } = usePushNotifications(response =>
    console.log('notification is pressed!', response),
  );

  // TODO: elke startup checke als meldingen zijn revoked. als zo dan verwijderen
  // TODO: Leuk. maar alleen de eerste keer als de gebruiker de app installeert! anders gaat hij elke keer weer aan.
  const requestAllowNotification = useCallback(async () => {
    const hasInternet = await internetConnectivity.hasInternetConnection();
    if (!hasInternet || (await hasExpoPushToken())) {
      return;
    }
    notificationToggle(true).catch(reason =>
      logger.error(
        'Failed by setting or checking if notification is allowed by startup',
        reason,
      ),
    );
  }, []);

  useEffect(() => {
    requestAllowNotification();
    registerAndGeneratePushNotificationsToken().then(token =>
      console.log('TOKEN: -->', token),
    );
  }, [requestAllowNotification]);

  return <>{children}</>;
};

export default Notification;
