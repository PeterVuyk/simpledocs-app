import toggleNotifications from '../firebase/functions/toggleNotifications';
import registerAndGeneratePushNotificationsToken from './registerAndGeneratePushNotificationsToken';

/**
 * Returns true if toggle is ok. False if toggle was not possible (for example blocked by user in settings phone).
 */
const notificationToggle = async (
  allowNotifications: boolean,
): Promise<boolean> => {
  if (!allowNotifications) {
    await toggleNotifications(null);
    return true;
  }
  const token = await registerAndGeneratePushNotificationsToken();
  if (!token) {
    return false;
  }
  await toggleNotifications(token);
  return true;
};

export default notificationToggle;
