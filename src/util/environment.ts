import * as Updates from 'expo-updates';
import {
  Environment,
  DEVELOPMENT_ENVIRONMENT,
  PRODUCTION_ENVIRONMENT,
  STAGING_ENVIRONMENT,
} from '../model/Environment';

function getEnvironment(): Environment {
  if (Updates.releaseChannel.startsWith('prod')) {
    // matches prod-v1, prod-v2, prod-v3
    return {
      envName: PRODUCTION_ENVIRONMENT,
      dbUrl: process.env.DATABASE_URL ?? '',
      apiKey: process.env.API_KEY ?? '',
    }; // prod env settings
  }
  if (Updates.releaseChannel.startsWith('staging')) {
    // matches staging-v1, staging-v2
    return {
      envName: STAGING_ENVIRONMENT,
      dbUrl: process.env.DATABASE_URL ?? '',
      apiKey: process.env.API_KEY ?? '',
    }; // stage env settings
  }
  // assume any other release channel is development
  return {
    envName: DEVELOPMENT_ENVIRONMENT,
    dbUrl: process.env.DATABASE_URL ?? '',
    apiKey: process.env.API_KEY ?? '',
  }; // dev env settings
}

function isProduction(): boolean {
  return ![STAGING_ENVIRONMENT, DEVELOPMENT_ENVIRONMENT].includes(
    getEnvironment().envName,
  );
}

const environment = { getEnvironment, isProduction };

export default environment;
