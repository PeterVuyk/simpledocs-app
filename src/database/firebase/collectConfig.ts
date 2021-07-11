import database from './database';
import logger from '../../helper/logger';

// eslint-disable-next-line @typescript-eslint/ban-types
async function getConfig(): Promise<object> {
  const config = await database()
    .collection('config')
    .get()
    .catch(reason =>
      logger.error('collecting config from firebase in getConfig', reason),
    );
  return config
    ? config.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      })
    : [];
}

const collectVersions = {
  getConfig,
};

export default collectVersions;
