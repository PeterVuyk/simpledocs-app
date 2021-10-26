import storageBucket from '../firebase/bucket/storageBucket';
import configurationsStorage from '../configurations/configurationsStorage';
import logger from '../util/logger';
import debugRepository from '../database/repository/debugRepository';
import articleRepository from '../database/repository/articleRepository';
import decisionTreeRepository from '../database/repository/decisionTreeRepository';
import calculationsRepository from '../database/repository/calculationsRepository';
import migrationChangelogRepository from '../database/repository/migrationChangelogRepository';
import notificationRepository from '../database/repository/notificationRepository';
import environment from '../util/environment';
import {
  ARTICLES,
  CALCULATIONS,
  DECISION_TREE,
  MIGRATION_CHANGELOG,
  NOTIFICATION,
} from '../database/tableNames';

let storageDebugPath = '';
let databaseContentIterator = 0;

const tableContentStorageCallback = (data: any) => {
  const dataBlob = new Blob([JSON.stringify(data)], {
    type: 'application/json;charset=utf-8',
  });
  storageBucket
    .putFile(
      dataBlob,
      `${storageDebugPath}content-${databaseContentIterator}.json`,
    )
    .catch(error =>
      logger.errorFromMessage(
        `Failed to storageTableContentDump message: ${error.message}, code: ${error.code}, name: ${error.name}`,
      ),
    );
};

const storageTableContentDump = (tableName: string) => {
  databaseContentIterator++;
  // eslint-disable-next-line default-case
  switch (tableName) {
    case ARTICLES:
      articleRepository.getArticles(tableContentStorageCallback);
      break;
    case DECISION_TREE:
      decisionTreeRepository.getDecisionTrees(tableContentStorageCallback);
      break;
    case CALCULATIONS:
      calculationsRepository.getCalculationsInfo(tableContentStorageCallback);
      break;
    case MIGRATION_CHANGELOG:
      migrationChangelogRepository.getMigrationChangelog(
        tableContentStorageCallback,
      );
      break;
    case NOTIFICATION:
      notificationRepository.getNotifications(tableContentStorageCallback);
  }
};

const storageTableDescription = (tableName: string, data: JSON[]) => {
  const dataBlob = new Blob([JSON.stringify(data)], {
    type: 'application/json;charset=utf-8',
  });

  if (data.length !== 0) {
    storageTableContentDump(tableName);
  }

  return storageBucket.putFile(
    dataBlob,
    `${storageDebugPath}describe-${tableName}.json`,
  );
};

const storageSystemConfigurations = async () => {
  const config = await configurationsStorage.getSystemConfiguration();
  const dataBlob = new Blob(
    [JSON.stringify(config ?? { systemConfig: 'notFound' })],
    {
      type: 'application/json;charset=utf-8',
    },
  );

  return storageBucket.putFile(
    dataBlob,
    `${storageDebugPath}appConfigurations.json`,
  );
};

const dumpConfigToStorage = async () => {
  storageDebugPath = `debug/${
    environment.getEnvironment().envName
  }/${new Date().toISOString()}/`;
  databaseContentIterator = 0;

  debugRepository
    .describeTables(storageTableDescription)
    .catch(error =>
      logger.errorFromMessage(
        `Failed to storageTableDescription message: ${error.message}, code: ${error.code}, name: ${error.name}`,
      ),
    );

  storageSystemConfigurations().catch(error =>
    logger.errorFromMessage(
      `Failed to storageSystemConfigurations message: ${error.message}, code: ${error.code}, name: ${error.name}`,
    ),
  );
};

const debugHandler = {
  dumpConfigToStorage,
};

export default debugHandler;
