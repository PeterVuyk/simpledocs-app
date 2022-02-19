import Constants from 'expo-constants';
import { LogBox } from 'react-native';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';
import environment from '../../util/environment';
import { DefaultResponse } from '../../model/apiResponse/DefaultResponse';

/**
 * We disable the warning below because it always pops-up but we don't use it. Later when we update sdk 44 to a higher version we can remove this LogBox
 */
LogBox.ignoreLogs([
  "Constants.installationId has been deprecated in favor of generating and storing your own ID. Implement it using expo-application's androidId on Android and a storage API such as expo-secure-store on iOS and localStorage on the web. This API will be removed in SDK 44.",
]);

async function toggleNotifications(
  expoPushToken: string | null,
): Promise<void> {
  const response = await httpsCallable(
    functions,
    'appApi-toggleNotifications',
  )({
    environment: environment.getEnvironment().envName,
    appVersion: Constants.manifest?.version,
    expoPushToken,
  }).then(value => value.data as DefaultResponse);
  if (!response.success) {
    throw new Error(
      `Failed toggling notifications from server onStartup, message server: ${response.message}`,
    );
  }
}

export default toggleNotifications;
