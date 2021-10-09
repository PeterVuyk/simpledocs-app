import Constants from 'expo-constants';
import { LogBox } from 'react-native';
import { AppConfigurationsResponse } from '../model/ApiResponse';
import { AppConfigurations } from '../model/AppConfigurations';

/**
 * We disable the warning below because it always pops-up but we don't use it. Later when we use sdk 44 we can remove this LogBox
 */
LogBox.ignoreLogs([
  "Constants.installationId has been deprecated in favor of generating and storing your own ID. Implement it using expo-application's androidId on Android and a storage API such as expo-secure-store on iOS and localStorage on the web. This API will be removed in SDK 44.",
]);

async function getAppConfigurations(): Promise<AppConfigurations> {
  const appConfigurationsResponse = await fetch(
    new URL('getConfigurations', process.env.APP_SERVER_API_URL).toString(),
    {
      headers: {
        Accept: `application/json;api-version=${Constants.manifest?.version}`,
      },
    },
  ).then(response => response.json() as Promise<AppConfigurationsResponse>);

  return new Promise((resolve, reject) => {
    if (!appConfigurationsResponse.success) {
      reject(
        new Error(
          `Failed collecting configurations from server, message server: ${appConfigurationsResponse.message}`,
        ),
      );
    }
    resolve(appConfigurationsResponse.result!);
  });
}

const appConfigurationsClient = {
  getAppConfigurations,
};

export default appConfigurationsClient;
