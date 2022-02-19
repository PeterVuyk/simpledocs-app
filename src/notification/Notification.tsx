import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import usePushNotifications from './usePushNotifications';
import notificationToggle from './notificationToggle';
import logger from '../util/logger';
import internetConnectivity from '../helper/internetConnectivity';
import hasExpoPushToken from './hasExpoPushToken';
import toggleNotifications from '../firebase/functions/toggleNotifications';
import isAppNotificationsDisabledFromSleep from './isAppNotificationsDisabledFromSleep';
import enableDisabledNotificationsFromSleep from '../firebase/functions/enableDisabledNotificationsFromSleep';

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

  const enableNotificationsIfAppLongSleep = useCallback(
    async () =>
      (await isAppNotificationsDisabledFromSleep())
        ? enableDisabledNotificationsFromSleep()
        : Promise.resolve(),
    [],
  );

  useEffect(() => {
    if (firstStartupApp) {
      requestAllowNotification().catch(reason =>
        logger.error(
          'Failed by setting or checking if notification is allowed by startup',
          reason,
        ),
      );
    } else {
      enableNotificationsIfAppLongSleep().catch(reason =>
        logger.error(
          'Tried to enable disabledNotification from sleep by startup app but an error has occurred',
          reason,
        ),
      );
      removeExpoPushTokenIfNotificationIsRevoked().catch(reason =>
        logger.error(
          'Failed to remove expo push token if notification is revoked',
          reason,
        ),
      );
    }
  }, [
    enableNotificationsIfAppLongSleep,
    firstStartupApp,
    removeExpoPushTokenIfNotificationIsRevoked,
    requestAllowNotification,
  ]);

  return <>{children}</>;
};

export default Notification;
