import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConfigInfo } from '../model/ConfigInfo';
import logger from '../helper/logger';

let config: ConfigInfo | undefined;

const storeAppConfiguration = async (configurations: ConfigInfo) => {
  const jsonValue = JSON.stringify(configurations);
  config = configurations;
  await AsyncStorage.setItem('appConfig.json', jsonValue).catch(reason =>
    logger.error(
      'Failed to store the configurations to the fileStorage',
      reason,
    ),
  );
};

const getAppConfiguration = async () => {
  if (config !== undefined) {
    return config;
  }
  await AsyncStorage.getItem('appConfig.json')
    .then(jsonValue => (jsonValue != null ? JSON.parse(jsonValue) : null))
    .then(configuration => {
      config = configuration;
    })
    .catch(reason =>
      logger.error('Failed to get configurations from storage', reason),
    );
  return config;
};

const configurationsDAO = {
  getAppConfig: getAppConfiguration,
  storeAppConfiguration,
};

export default configurationsDAO;
