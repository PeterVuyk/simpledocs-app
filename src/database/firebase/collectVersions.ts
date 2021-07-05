import database from './database';
import logger from '../../helper/logger';
import { AggregateVersions } from '../../model/AggregateVersions';

async function getVersioning(): Promise<AggregateVersions | null> {
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
  return versioning ? (versioning.data() as AggregateVersions) : null;
}

const collectVersions = {
  getVersioning,
};

export default collectVersions;
