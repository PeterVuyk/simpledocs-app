import { getAuth } from 'firebase/auth';

const hasExpoPushToken = async (): Promise<boolean> => {
  const token = await getAuth()
    .currentUser?.getIdTokenResult(true)
    .then(value => value.claims.expoPushToken);
  return !(token === undefined || token === null);
};

/**
 * This function checks if the 'expoPushToken' is ever set before for this user. If it was set before then that
 * means that the user enabled/disabled the notification. This information can be helpful for example to check if
 * we need to register the notification on only startup.
 */
const hasExpoPushTokenProperty = async (): Promise<boolean> => {
  const idTokenResult = await getAuth().currentUser?.getIdTokenResult(true);
  if (!idTokenResult) {
    return false;
  }
  return idTokenResult.claims.expoPushToken !== undefined;
};

const notificationToken = {
  hasExpoPushToken,
  hasExpoPushTokenProperty,
};

export default notificationToken;
