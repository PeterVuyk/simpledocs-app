import Constants from 'expo-constants';
import { VersioningResponse } from '../model/ApiResponse';
import { AggregateVersions } from '../model/AggregateVersions';

async function getVersioning(): Promise<AggregateVersions[]> {
  const versioningResponse = await fetch(
    new URL('getVersioning', process.env.APP_SERVER_API_URL).toString(),
    { headers: { api_version: Constants.manifest?.version ?? '1.0.0' } },
  ).then(response => response.json() as Promise<VersioningResponse>);

  if (!versioningResponse.success) {
    throw new Error(
      `Failed collecting versioning from server, message server: ${versioningResponse.message}`,
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
