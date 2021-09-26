import Constants from 'expo-constants';
import { ConfigInfoResponse } from '../model/ApiResponse';
import { ConfigInfo } from '../model/ConfigInfo';

async function getConfigInfo(): Promise<ConfigInfo> {
  const configInfoResponse = await fetch(
    new URL('getConfigurations', process.env.APP_SERVER_API_URL).toString(),
    {
      headers: {
        Accept: `application/json;api-version=${Constants.manifest?.version}`,
      },
    },
  ).then(response => response.json() as Promise<ConfigInfoResponse>);

  return new Promise((resolve, reject) => {
    if (!configInfoResponse.success) {
      reject(
        new Error(
          `Failed collecting configurations from server, message server: ${configInfoResponse.message}`,
        ),
      );
    }
    resolve(configInfoResponse.result!);
  });
}

const configurationsClient = {
  getConfigInfo,
};

export default configurationsClient;
