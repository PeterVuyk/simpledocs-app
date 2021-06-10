import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';
import { Notification } from '../entity/Notification';

const db = SQLite.openDatabase('db.db');

function getNotifications(
  callback: (notifications: Notification[]) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          `SELECT *
           FROM notifications;`,
          [],
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (_, { rows: { _array } }) => {
            callback(
              _array.map((result: any) => {
                return {
                  notificationType: result.notificationType,
                  notificationEnabled: result.notificationEnabled === 1,
                } as Notification;
              }) as Notification[],
            );
          },
        );
      },
      error => {
        logger.error(
          'NotificationRepository.getNotifications failed',
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
  getNotifications,
  updateNotification,
};

export default notificationRepository;
