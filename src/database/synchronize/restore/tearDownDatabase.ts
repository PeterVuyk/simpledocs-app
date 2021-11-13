import * as SQLite from 'expo-sqlite';
import logger from '../../../util/logger';

const db = SQLite.openDatabase('db.db');

function down(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql('drop table if exists migrationChangelog');
        sqlTransaction.executeSql('drop table if exists notification');
        sqlTransaction.executeSql('drop table if exists articles;');
        sqlTransaction.executeSql('drop table if exists calculations;');
        sqlTransaction.executeSql('drop table if exists decisionTrees;');
      },
      error => {
        logger.error('tearing down database has failed', error.message);
        reject();
      },
      resolve,
    );
  });
}

const tearDownDatabase = {
  down,
};

export default tearDownDatabase;
