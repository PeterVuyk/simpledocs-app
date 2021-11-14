import * as SQLite from 'expo-sqlite';
import logger from '../../util/logger';
import { Notification } from '../../model/notifications/Notification';
import { NotificationType } from '../../model/notifications/NotificationType';

const db = SQLite.openDatabase('db.db');

function getNotifications(
  callback: (notification: Notification[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM notification;`,
        [],
        // @ts-ignore
        (_, { rows: { _array } }) => {
          callback(_array as Notification[]);
        },
      );
    },
    error =>
      logger.error(
        'notificationRepository.getNotifications failed',
        error.message,
      ),
  );
}

function getNotification(
  callback: (notification: Notification) => void,
  notificationType: NotificationType,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          `SELECT *
           FROM notification WHERE notificationType = ? LIMIT 1;`,
          [notificationType],
          // @ts-ignore
          (_, { rows: { _array } }) => {
            if (_array.length === 1) {
              callback({
                notificationType: _array[0].notificationType,
                notificationEnabled: _array[0].notificationEnabled === 1,
              });
            }
          },
        );
      },
      error => {
        logger.error(
          'notificationRepository.getNotification failed',
          error.message,
        );
        reject();
      },
      resolve,
    );
  });
}

function updateNotification(notification: Notification): void {
  db.transaction(sqlTransaction => {
    sqlTransaction.executeSql(
      `UPDATE notification
         SET notificationEnabled = ?
         WHERE notificationType = ?`,
      [notification.notificationEnabled ? 1 : 0, notification.notificationType],
    );
  });
}

const notificationRepository = {
  getNotification,
  getNotifications,
  updateNotification,
};

export default notificationRepository;
