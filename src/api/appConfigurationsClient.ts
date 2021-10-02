import Constants from 'expo-constants';
import { AppConfigurationsResponse } from '../model/ApiResponse';
import { AppConfigurations } from '../model/AppConfigurations';

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
