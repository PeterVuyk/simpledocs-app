import * as Updates from 'expo-updates';
import {
  Environment,
  DEVELOPMENT_ENVIRONMENT,
  PRODUCTION_ENVIRONMENT,
  STAGING_ENVIRONMENT,
  CUSTOMER_ACADEMIE_AMBULANCEZORG,
  CUSTOMER_DEFAULT,
} from '../model/Environment';

const getCustomer = (): string => {
  return process.env.APP_DOMAIN === CUSTOMER_ACADEMIE_AMBULANCEZORG
    ? CUSTOMER_ACADEMIE_AMBULANCEZORG
    : CUSTOMER_DEFAULT;
};

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
  console.log('customer', process.env.APP_DOMAIN);
  console.log('envName', Updates.releaseChannel.toLowerCase());
  return {
    customer: getCustomer(),
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
