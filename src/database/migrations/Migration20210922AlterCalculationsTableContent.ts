import { SQLTransaction } from 'expo-sqlite';
import { Migration } from './Migration';

export default class Migration20210815InitializeTablesWithInitialData
  implements Migration
{
  public getId(): string {
    return 'Migration20210922AlterCalculationsTableContent';
  }

  public up(sqlTransaction: SQLTransaction): void {
    sqlTransaction.executeSql(
      `ALTER TABLE calculations ADD contentType varchar not null default 'html';`,
    );
    sqlTransaction.executeSql(
      'ALTER TABLE calculations RENAME COLUMN htmlFile TO content;',
    );
    sqlTransaction.executeSql(
      'create table calculations_dg_tmp (calculationType text not null constraint calculations_pk primary key, listIndex integer not null, title text not null, explanation text not null, content blob not null, iconFile blob not null, contentType varchar not null);',
    );
    sqlTransaction.executeSql(
      'insert into calculations_dg_tmp(calculationType, listIndex, title, explanation, content, iconFile, contentType) select calculationType, listIndex, title, explanation, content, iconFile, contentType from calculations;',
    );
    sqlTransaction.executeSql('drop table calculations;');
    sqlTransaction.executeSql(
      'alter table calculations_dg_tmp rename to calculations;',
    );
  }
}
