import { useEffect } from 'react';
import { setNotificationHandler } from 'expo-notifications';
import * as Notifications from 'expo-notifications';
import logger from '../util/logger';
import useContentNavigator from '../components/hooks/useContentNavigator';
import { NotificationData } from '../model/notifications/NotificationData';

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
  }, [lastNotificationResponse, navigateFromId]);

  return {};
};

export default useHandlePushNotifications;
