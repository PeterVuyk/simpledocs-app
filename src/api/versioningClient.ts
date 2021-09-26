import Constants from 'expo-constants';
import { VersioningResponse } from '../model/ApiResponse';
import { AggregateVersions } from '../model/AggregateVersions';
import logger from '../helper/logger';

async function getVersioning(): Promise<AggregateVersions[]> {
  const versioningResponse = await fetch(
    new URL('getVersioning', process.env.APP_SERVER_API_URL).toString(),
    {
      headers: {
        Accept: `application/json;api-version=${Constants.manifest?.version}`,
      },
    },
  )
    .then(response => response.json() as Promise<VersioningResponse>)
    .catch(reason => {
      logger.error('Failure occurred by getting version from api', reason);
    });

  if (!versioningResponse || !versioningResponse.success) {
    throw new Error(
      `Failed collecting versioning from server, message: ${
        !versioningResponse
          ? 'no message, response not defined'
          : versioningResponse.message
      }`,
    );
  }

  const result = [];
  for (const [key, value] of Object.entries(
    // eslint-disable-next-line @typescript-eslint/ban-types
    versioningResponse.result as object,
  )) {
    result.push({ [key]: value });
  }
  return result as AggregateVersions[];
}

const versioningClient = {
  getVersioning,
};

export default versioningClient;
