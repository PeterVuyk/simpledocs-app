import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from '../util/logger';
import { SystemConfigurations } from '../model/SystemConfigurations';

let systemConfigurations: SystemConfigurations | undefined;

const removeSystemConfiguration = async () => {
  AsyncStorage.removeItem('systemConfigurations.json').catch(reason =>
    logger.error('Failed removing systemConfiguration from storage', reason),
  );
};

const storeSystemConfiguration = async (
  configurations: SystemConfigurations,
) => {
  const jsonValue = JSON.stringify(configurations);
  systemConfigurations = configurations;
  await AsyncStorage.setItem('systemConfigurations.json', jsonValue).catch(
    reason =>
      logger.error(
        'Failed to store the systemConfigurations to the fileStorage, the user may not be able to use the app!',
        reason,
      ),
  );
};

const getSystemConfiguration = async () => {
  if (systemConfigurations !== undefined) {
    return systemConfigurations;
  }
  await AsyncStorage.getItem('systemConfigurations.json')
    .then(jsonValue => (jsonValue != null ? JSON.parse(jsonValue) : null))
    .then(configuration => {
      systemConfigurations = configuration as SystemConfigurations;
    })
    .catch(reason =>
      logger.error(
        'Failed to get configurations from storage, the user may not be able to use the app!',
        reason,
      ),
    );
  return systemConfigurations;
};

const configurationsStorage = {
  getSystemConfiguration,
  storeSystemConfiguration,
  removeSystemConfiguration,
};

export default configurationsStorage;
