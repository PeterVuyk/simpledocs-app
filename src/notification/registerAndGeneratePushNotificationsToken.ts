import { isDevice } from 'expo-device';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

const registerAndGeneratePushNotificationsToken = async (): Promise<
  string | undefined
> => {
  if (!isDevice) {
    alert('Sorry, Push Notifications are only supported on physical devices.');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === 'android') {
    // TODO: check wat hiervan de meerwaarde van is
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // eslint-disable-next-line consistent-return
  return token;
};

export default registerAndGeneratePushNotificationsToken;
