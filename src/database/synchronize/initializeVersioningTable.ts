import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';

const db = SQLite.openDatabase('db.db');

function initialize(): Promise<any> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          'create table if not exists notifications (notificationType varchar not null, notificationEnabled NUMERIC default 1 not null);',
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO notifications (notificationType, notificationEnabled) VALUES ('noInternetConnection', 1);",
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO notifications (notificationType, notificationEnabled) VALUES ('horizontalScrollTip', 1);",
        );
        sqlTransaction.executeSql(
          'CREATE UNIQUE INDEX IF NOT EXISTS notifications_uindex ON notifications (notificationType);',
        );
        sqlTransaction.executeSql(
          'create table if not exists versioning (aggregate varchar not null, version varchar not null);',
        );
        sqlTransaction.executeSql(
          'CREATE UNIQUE INDEX IF NOT EXISTS versioning_aggregate_uindex ON versioning (aggregate);',
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES ('RVV1990', 'initial');",
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES ('regelingOGS2009', 'initial');",
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES ('brancherichtlijnMedischeHulpverlening', 'initial');",
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES ('ontheffingGoedeTaakuitoefening', 'initial');",
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES ('decisionTree', 'initial');",
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES ('calculations', 'initial');",
        );
        sqlTransaction.executeSql(
          "INSERT OR IGNORE INTO versioning (aggregate, version) VALUES ('instructionManual', 'initial');",
        );
      },
      error => {
        logger.error(
          'initialization database with versions table has failed, rolled back',
          error.message,
        );
        reject();
      },
      resolve,
    );
  });
}
const initializeVersioningTable = {
  initialize,
};

export default initializeVersioningTable;
