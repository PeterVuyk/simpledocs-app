import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppConfigurations } from '../model/AppConfigurations';
import logger from '../helper/logger';

let appConfigurations: AppConfigurations | undefined;

const storeAppConfiguration = async (configurations: AppConfigurations) => {
  const jsonValue = JSON.stringify(configurations);
  appConfigurations = configurations;
  await AsyncStorage.setItem('appConfigurations.json', jsonValue).catch(
    reason =>
      logger.error(
        'Failed to store the appConfigurations to the fileStorage',
        reason,
      ),
  );
};

const getAppConfiguration = async () => {
  if (appConfigurations !== undefined) {
    return appConfigurations;
  }
  await AsyncStorage.getItem('appConfigurations.json')
    .then(jsonValue => (jsonValue != null ? JSON.parse(jsonValue) : null))
    .then(configuration => {
      appConfigurations = configuration;
    })
    .catch(reason =>
      logger.error('Failed to get configurations from storage', reason),
    );
  return appConfigurations;
};

const configurationsDAO = {
  getAppConfiguration,
  storeAppConfiguration,
};

export default configurationsDAO;
