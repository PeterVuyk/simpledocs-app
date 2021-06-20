import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';
import { Notification } from '../../model/Notification';
import { NotificationType } from '../../model/NotificationType';

const db = SQLite.openDatabase('db.db');

function getNotification(
  callback: (notification: Notification) => void,
  notificationType: NotificationType,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          `SELECT *
           FROM notifications WHERE notificationType = ? LIMIT 1;`,
          [notificationType],
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
          'notificationRepository.getNotifications failed',
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
      `UPDATE notifications
         SET notificationEnabled = ?
         WHERE notificationType = ?`,
      [notification.notificationEnabled ? 1 : 0, notification.notificationType],
    );
  });
}

const notificationRepository = {
  getNotification,
  updateNotification,
};

export default notificationRepository;
