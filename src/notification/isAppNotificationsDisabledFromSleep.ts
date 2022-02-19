import { getAuth } from 'firebase/auth';

/**
 * If a delivery of a notification failed to send to the user because 'DeviceNotRegistered',
 * sending notifications to the user is disabled until the user restarts the app.
 *
 * A reason that a device is not registered can be that the user doesn't
 * use the app for a while, then all notifications are disabled.
 */
const isAppNotificationsDisabledFromSleep = async (): Promise<boolean> => {
  return (
    getAuth()
      .currentUser?.getIdTokenResult(true)
      .then(
        value =>
          value.claims.appNotificationsDisabled !== undefined &&
          // @ts-ignore
          value.claims.appNotificationsDisabled === true,
      ) ?? false
  );
};

export default isAppNotificationsDisabledFromSleep;
