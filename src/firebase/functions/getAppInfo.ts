import Constants from 'expo-constants';
import { LogBox } from 'react-native';
import { AppInfoResponse, AppInfo } from '../../model/AppInfoResponse';
import { Versions } from '../../model/AppConfigurations';
import Firebase from '../firebase';
import environment from '../../util/environment';

/**
 * We disable the warning below because it always pops-up but we don't use it. Later when we use sdk 44 we can remove this LogBox
 */
LogBox.ignoreLogs([
  "Constants.installationId has been deprecated in favor of generating and storing your own ID. Implement it using expo-application's androidId on Android and a storage API such as expo-secure-store on iOS and localStorage on the web. This API will be removed in SDK 44.",
]);

async function getAppInfo(versioning: Versions | undefined): Promise<AppInfo> {
  const response = await Firebase.functions(process.env.FIREBASE_REGION)
    .httpsCallable('getAppInfo')({
      environment: environment.getEnvironment().envName,
      appVersion: Constants.manifest?.version,
      versioning,
    })
    .then(value => value.data as AppInfoResponse);
  if (!response.success) {
    throw new Error(
      `Failed collecting configurations from server, message server: ${response.message}`,
    );
  }
  return response.result!;
}

export default getAppInfo;
