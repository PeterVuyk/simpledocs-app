import database from './database';
import logger from '../../helper/logger';
import { AggregateVersions } from '../../model/AggregateVersions';

async function getVersioning(): Promise<AggregateVersions[]> {
  const versioning = await database()
    .collection('versioning')
    .doc('aggregate')
    .get()
    .catch(reason =>
      logger.error(
        'collecting version from firebase in updateDecisionTreeIfNewVersion',
        reason,
      ),
    );
  if (!versioning) {
    return [];
  }
  const result = [];
  // eslint-disable-next-line no-restricted-syntax,@typescript-eslint/ban-types
  for (const [key, value] of Object.entries(versioning.data() as object)) {
    result.push({ [key]: value });
  }
  return result as AggregateVersions[];
}

const collectVersions = {
  getVersioning,
};

export default collectVersions;
