import { useEffect } from 'react';
import { setNotificationHandler } from 'expo-notifications';
import * as Notifications from 'expo-notifications';
import logger from '../util/logger';
import useContentNavigator from '../components/hooks/useContentNavigator';
import { NotificationData } from '../model/notifications/NotificationData';
import notificationToken from './notificationToken';
import notificationToggle from './notificationToggle';

setNotificationHandler({
  // eslint-disable-next-line @typescript-eslint/require-await
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const useHandlePushNotifications = () => {
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const { navigateFromId } = useContentNavigator();

  /**
   * An edge case: If a user removes the app and the notifications wat toggled on, then removes the app and installs
   * it again and turns off the notification in the settingsModal. Then we still have the token saved in the previous
   * anonymous account in Firebase. The result is that the user receives the notification. The work around is that we
   * 'check' that the user want to receive a notification. If he later disables this, then the calling API will remove
   * all other tokens from this device as well.
   */
  const setExpoPushTokenUserOnNotificationReceival = async () => {
    if (!(await notificationToken.hasExpoPushTokenProperty())) {
      notificationToggle(true).then(isSuccessful => {
        console.log('isSuccessful', isSuccessful);
        if (!isSuccessful) {
          throw new Error('Tried to toggle notification on but unsuccessful');
        }
      });
    }
  };

  // with the help off the useLastNotificationResponse hook, we can
  // check the notification info when the app was turned off completely
  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      const data = lastNotificationResponse.notification.request.content
        .data as NotificationData;
      if (data?.navigate !== undefined) {
        navigateFromId(data.navigate.id, 'notification').catch(reason =>
          logger.error(
            `Clicked on notification and tried to navigate to page ${data.navigate?.id} from aggregate ${data.navigate?.aggregate} but failed`,
            reason,
          ),
        );
      }
    }
    setExpoPushTokenUserOnNotificationReceival().catch(reason =>
      logger.error(
        'Users account has no expoPushToken but received a push notification. For this reason we tried to toggle notifications on but toggle failed',
        reason,
      ),
    );
  }, [lastNotificationResponse, navigateFromId]);

  return {};
};

export default useHandlePushNotifications;
