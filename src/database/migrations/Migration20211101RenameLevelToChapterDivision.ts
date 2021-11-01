import { SQLTransaction } from 'expo-sqlite';
import { Migration } from './Migration';

export default class Migration20211101RenameLevelToChapterDivision
  implements Migration
{
  public getId(): string {
    return 'Migration20211101RenameLevelToChapterDivision';
  }

  public up(sqlTransaction: SQLTransaction): void {
    sqlTransaction.executeSql(
      'ALTER TABLE articles RENAME COLUMN level TO chapterDivision;',
    );
  }
}
