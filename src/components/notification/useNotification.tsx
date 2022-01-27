import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  NOTIFICATION_TYPE_HORIZONTAL_SCROLL_TIP,
  NOTIFICATION_TYPE_NO_INTERNET_CONNECTION,
  NotificationType,
} from '../../model/notifications/NotificationType';
import notificationRepository from '../../database/repository/notificationRepository';
import { Notification } from '../../model/notifications/Notification';
import logger from '../../util/logger';

const useNotification = () => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const disableNotification = (type: NotificationType) => {
    notificationRepository.updateNotification({
      notificationType: type,
      notificationEnabled: false,
    });
  };

  const showNoInternetNotification = useCallback(() => {
    Alert.alert(
      'Er is geen internet beschikbaar',
      'De app functioneert het beste met een internet verbinding, zo ontvang je van ons de laatste wijzigingen en worden alle afbeeldingen juist weergegeven.',
      [
        {
          text: 'Niet meer melden',
          onPress: () =>
            disableNotification(NOTIFICATION_TYPE_NO_INTERNET_CONNECTION),
        },
        { text: 'OK', onPress: () => null },
      ],
      { cancelable: true },
    );
  }, []);

  const showHorizontalScrollTip = useCallback(() => {
    Alert.alert(
      'Tip voor navigeren:',
      "Swipe makkelijk horizontaal tussen de verschillende pagina's.",
      [
        {
          text: 'Niet meer melden',
          onPress: () =>
            disableNotification(NOTIFICATION_TYPE_HORIZONTAL_SCROLL_TIP),
        },
        { text: 'OK', onPress: () => null },
      ],
      { cancelable: true },
    );
  }, []);

  useEffect(() => {
    if (notification !== null && notification.notificationEnabled) {
      switch (notification.notificationType) {
        case NOTIFICATION_TYPE_HORIZONTAL_SCROLL_TIP:
          showHorizontalScrollTip();
          break;
        case NOTIFICATION_TYPE_NO_INTERNET_CONNECTION:
          showNoInternetNotification();
          break;
        default:
      }
    }
  }, [notification, showHorizontalScrollTip, showNoInternetNotification]);

  const notify = useCallback((notificationType: NotificationType) => {
    notificationRepository
      .getNotification(setNotification, notificationType)
      .catch(reason =>
        logger.error('Failed retrieving notification from repository', reason),
      );
  }, []);

  return { notify };
};

export default useNotification;
