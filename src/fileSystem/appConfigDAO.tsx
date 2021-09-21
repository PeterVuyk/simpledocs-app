import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConfigInfo } from '../model/ConfigInfo';
import logger from '../helper/logger';

let config: ConfigInfo | undefined;

const storeAppConfiguration = async (appConfig: ConfigInfo) => {
  const jsonValue = JSON.stringify(appConfig);
  config = appConfig;
  await AsyncStorage.setItem('appConfig.json', jsonValue).catch(reason =>
    logger.error('Failed to store the appConfig to the fileStorage', reason),
  );
};

const getAppConfig = async () => {
  if (config !== undefined) {
    return config;
  }
  await AsyncStorage.getItem('appConfig.json')
    .then(jsonValue => (jsonValue != null ? JSON.parse(jsonValue) : null))
    .then(appConfig => {
      config = appConfig;
    })
    .catch(reason =>
      logger.error('Failed to get appConfig from storage', reason),
    );
  return config;
};

const appConfigDAO = {
  getAppConfig,
  storeAppConfiguration,
};

export default appConfigDAO;
