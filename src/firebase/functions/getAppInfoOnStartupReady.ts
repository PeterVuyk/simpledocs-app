import Constants from 'expo-constants';
import { LogBox } from 'react-native';
import { httpsCallable } from 'firebase/functions';
import {
  AppInfoResponse,
  AppInfo,
} from '../../model/apiResponse/AppInfoResponse';
import { Versions } from '../../model/configurations/AppConfigurations';
import { functions } from '../firebase';
import environment from '../../util/environment';

/**
 * We disable the warning below because it always pops-up but we don't use it. Later when we update sdk 44 to a higher version we can remove this LogBox
 */
LogBox.ignoreLogs([
  "Constants.installationId has been deprecated in favor of generating and storing your own ID. Implement it using expo-application's androidId on Android and a storage API such as expo-secure-store on iOS and localStorage on the web. This API will be removed in SDK 44.",
]);

async function getAppInfoOnStartupReady(
  versioning: Versions | undefined,
): Promise<AppInfo> {
  return httpsCallable(
    functions,
    'appApi-getAppInfoOnStartupReady',
  )({
    environment: environment.getEnvironment().envName,
    appVersion: Constants.manifest?.version,
    versioning,
  })
    .then(value => value.data as AppInfoResponse)
    .then(response => {
      if (!response.success) {
        throw new Error(
          `Failed collecting configurations from server startupReady, message server: ${response.message}`,
        );
      }
      return response.result!;
    });
}

export default getAppInfoOnStartupReady;
