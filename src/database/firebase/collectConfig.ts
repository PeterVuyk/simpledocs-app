import database from './database';
import { ConfigInfo } from '../../model/ConfigInfo';
import logger from '../../helper/logger';

async function getConfig(): Promise<void | ConfigInfo> {
  return database()
    .collection('config')
    .doc('appConfig')
    .get()
    .then(value => value.data() as ConfigInfo)
    .then(value => value)
    .catch(reason =>
      logger.error(
        'Failed collecting articles from config file to save in versioning table',
        reason,
      ),
    );
}

const collectConfig = {
  getConfig,
};

export default collectConfig;
