import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from '../util/logger';
import { StandalonePage } from '../model/standalonePages/StandalonePage';

// TODO: Niet nodig? store overwrites...
const removeStandalonePages = async (): Promise<void> => {
  AsyncStorage.removeItem('aggregate/standalonePages.json').catch(reason =>
    logger.error('Failed removing standalonePages from storage', reason),
  );
};

const storeStandalonePages = async (
  standalonePages: StandalonePage[],
): Promise<void> => {
  console.log('stand', standalonePages);
  const jsonValue = JSON.stringify(standalonePages);
  await AsyncStorage.setItem('aggregate/standalonePages.json', jsonValue).catch(
    reason =>
      logger.error(
        'Failed to store the standalonePages to the fileStorage',
        reason,
      ),
  );
};

const getStandalonePages = async (): Promise<StandalonePage[]> => {
  return AsyncStorage.getItem('aggregate/standalonePages.json')
    .then(jsonValue => (jsonValue != null ? JSON.parse(jsonValue) : null))
    .catch(reason =>
      logger.error('Failed to get standalonePages from storage', reason),
    );
};

const standalonePagesStorage = {
  getStandalonePages,
  storeStandalonePages,
  removeStandalonePages,
};

export default standalonePagesStorage;
