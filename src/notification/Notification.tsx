import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import usePushNotifications from './usePushNotifications';
import notificationToggle from './notificationToggle';
import logger from '../util/logger';
import internetConnectivity from '../helper/internetConnectivity';
import hasExpoPushToken from './hasExpoPushToken';
import toggleNotifications from '../firebase/functions/toggleNotifications';

interface Props {
  children: ReactNode;
  firstStartupApp: boolean;
}
const Notification: FC<Props> = ({ children, firstStartupApp }) => {
  const { notification } = usePushNotifications(response =>
    console.log('notification is pressed!', response),
  );

  /**
   * For the first startup we need to check if we can send notifications,
   * if yes we get the expoPushToken and send it to the api.
   * For this internet is needed, but not a problem since
   * internet is required at the first startup app.
   */
  const requestAllowNotification = useCallback(async () => {
    const hasInternet = await internetConnectivity.hasInternetConnection();
    if (!hasInternet || (await hasExpoPushToken())) {
      return Promise.resolve();
    }
    return notificationToggle(true);
  }, []);

  /**
   * If the user revokes notifications in his phone settings for the app,
   * then we need to remove the push token from the user, first to remove
   * the push token from the API, second to update the user settings in the app.
   * Internet is required because we need to make an API call.
   */
  const removeExpoPushTokenIfNotificationIsRevoked =
    useCallback(async (): Promise<void> => {
      if (!(await internetConnectivity.hasInternetConnection())) {
        return;
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      if (existingStatus !== 'granted' && (await hasExpoPushToken())) {
        await toggleNotifications(null);
      }
    }, []);

  useEffect(() => {
    if (firstStartupApp) {
      requestAllowNotification().catch(reason =>
        logger.error(
          'Failed by setting or checking if notification is allowed by startup',
          reason,
        ),
      );
    } else {
      removeExpoPushTokenIfNotificationIsRevoked().catch(reason =>
        logger.error(
          'Failed to remove expo push token if notification is revoked',
          reason,
        ),
      );
    }
  }, [
    firstStartupApp,
    removeExpoPushTokenIfNotificationIsRevoked,
    requestAllowNotification,
  ]);

  return <>{children}</>;
};

export default Notification;
