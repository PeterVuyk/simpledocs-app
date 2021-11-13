import { SQLTransaction } from 'expo-sqlite';
import { Migration } from './Migration';

export default class Migration20211113AddFavoritesToArticles
  implements Migration
{
  public getId(): string {
    return 'Migration20211113AddFavoritesToArticles';
  }

  public up(sqlTransaction: SQLTransaction): void {
    sqlTransaction.executeSql(
      `ALTER TABLE articles ADD bookmarked integer DEFAULT 0 NOT NULL;`,
    );
  }
}
