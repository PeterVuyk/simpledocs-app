import Constants from 'expo-constants';
import { ConfigInfoResponse } from '../model/ApiResponse';
import { ConfigInfo } from '../model/ConfigInfo';

async function getConfigInfo(): Promise<null | ConfigInfo> {
  const configInfoResponse = await fetch(
    new URL('getConfigurations', process.env.APP_SERVER_API_URL).toString(),
    { headers: { api_version: Constants.manifest?.version ?? '1.0.0' } },
  ).then(response => response.json() as Promise<ConfigInfoResponse>);

  if (!configInfoResponse.success) {
    throw new Error(
      `Failed collecting configurations from server, message server: ${configInfoResponse.message}`,
    );
  }
  return configInfoResponse.result;
}

const configurationsClient = {
  getConfigInfo,
};

export default configurationsClient;
