import { SQLTransaction } from 'expo-sqlite';
import { Migration } from './Migration';

export default class Migration20211116AlterArticlesIdColumn
  implements Migration
{
  public getId(): string {
    return 'Migration20211116AlterArticlesIdColumn';
  }

  public up(sqlTransaction: SQLTransaction): void {
    sqlTransaction.executeSql('alter table articles rename to bookPages;');
  }
}
