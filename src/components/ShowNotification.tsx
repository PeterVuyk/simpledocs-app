import React, { FC, useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import {
  NOTIFICATION_TYPE_HORIZONTAL_SCROLL_TIP,
  NOTIFICATION_TYPE_NO_INTERNET_CONNECTION,
  NotificationType,
} from '../model/NotificationType';
import notificationRepository from '../database/repository/notificationRepository';
import { Notification } from '../model/Notification';

interface Props {
  notificationType: NotificationType;
}

const ShowNotification: FC<Props> = ({ notificationType }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    notificationRepository.getNotification(setNotification, notificationType);
  }, [notificationType]);

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
    );
  }, []);

  const showHorizontalScrollTip = useCallback(() => {
    Alert.alert(
      'Tip voor navigeren:',
      'Scrol makkelijk horizontaal tussen de verschillende artikelen.',
      [
        {
          text: 'Niet meer melden',
          onPress: () =>
            disableNotification(NOTIFICATION_TYPE_HORIZONTAL_SCROLL_TIP),
        },
        { text: 'OK', onPress: () => null },
      ],
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

  return <View />;
};

export default ShowNotification;
