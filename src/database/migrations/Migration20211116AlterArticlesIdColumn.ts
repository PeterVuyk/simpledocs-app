import { SQLTransaction } from 'expo-sqlite';
import { Migration } from './Migration';

export default class Migration20211116AlterArticlesIdColumn
  implements Migration
{
  public getId(): string {
    return 'Migration20211116AlterArticlesIdColumn';
  }

  public up(sqlTransaction: SQLTransaction): void {
    sqlTransaction.executeSql(
      'create table articles_dg_tmp (pageIndex integer not null, title text not null, chapter varchar not null, bookType text not null, subTitle text, content blob not null, contentType varchar not null, searchText text not null, chapterDivision varchar not null, iconFile blob, bookmarked integer default 0 not null, id varchar not null constraint articles_pk primary key);',
    );
    sqlTransaction.executeSql(
      'insert into articles_dg_tmp(id, chapter, pageIndex, title, bookType, subTitle, content, contentType, searchText, chapterDivision, iconFile, bookmarked) select random(), chapter, pageIndex, title, bookType, subTitle, content, contentType, searchText, chapterDivision, iconFile, bookmarked from bookPages;',
    );
    sqlTransaction.executeSql('drop table bookPages;');
    sqlTransaction.executeSql(
      'alter table articles_dg_tmp rename to articles;',
    );
    sqlTransaction.executeSql(
      'create unique index articles_id_uindex on bookPages (id);',
    );
  }
}
