import { SQLTransaction } from 'expo-sqlite';
import { Migration } from './Migration';

export default class Migration20210815InsertScrollTipNotification
  implements Migration
{
  public getId(): string {
    return 'Migration20210815InsertScrollTipNotification';
  }

  public up(sqlTransaction: SQLTransaction): void {
    sqlTransaction.executeSql(
      "INSERT INTO notification (notificationType) VALUES ('horizontalScrollTip');",
    );
  }
}
