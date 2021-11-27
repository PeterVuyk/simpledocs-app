import * as Updates from 'expo-updates';
import {
  Environment,
  DEVELOPMENT_ENVIRONMENT,
  PRODUCTION_ENVIRONMENT,
  STAGING_ENVIRONMENT,
  CUSTOMER_DEFAULT,
} from '../model/Environment';

const getEnvironmentFromChannel = (): string => {
  // future matches prod-v1, prod-v2, prod-v3
  if (Updates.releaseChannel.toLowerCase() === PRODUCTION_ENVIRONMENT) {
    return PRODUCTION_ENVIRONMENT;
  }
  // future matches staging-v1, staging-v2
  if (Updates.releaseChannel.toLowerCase() === STAGING_ENVIRONMENT) {
    return STAGING_ENVIRONMENT;
  }
  // dev env settings
  return DEVELOPMENT_ENVIRONMENT;
};

const getEnvironment = (): Environment => {
  return {
    customer: process.env.CUSTOMER_NAME ?? CUSTOMER_DEFAULT,
    envName: getEnvironmentFromChannel(),
  };
};

function isProduction(): boolean {
  return ![STAGING_ENVIRONMENT, DEVELOPMENT_ENVIRONMENT].includes(
    getEnvironment().envName,
  );
}

const environment = { getEnvironment, isProduction };

export default environment;
