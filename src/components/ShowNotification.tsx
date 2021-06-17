import React, { useCallback, useState } from 'react';
import { Alert, View } from 'react-native';
import { NotificationType } from '../database/model/NotificationType';
import notificationRepository from '../database/repository/notificationRepository';
import { Notification } from '../database/model/Notification';

interface Props {
  notificationType: NotificationType;
}

const ShowNotification: React.FC<Props> = ({ notificationType }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  React.useEffect(() => {
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
          onPress: () => disableNotification('noInternetConnection'),
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
          onPress: () => disableNotification('horizontalScrollTip'),
        },
        { text: 'OK', onPress: () => null },
      ],
    );
  }, []);

  React.useEffect(() => {
    if (notification !== null && notification.notificationEnabled) {
      switch (notification.notificationType) {
        case 'horizontalScrollTip':
          showHorizontalScrollTip();
          break;
        case 'noInternetConnection':
          showNoInternetNotification();
          break;
        default:
      }
    }
  }, [notification, showHorizontalScrollTip, showNoInternetNotification]);

  return <View />;
};

export default ShowNotification;
