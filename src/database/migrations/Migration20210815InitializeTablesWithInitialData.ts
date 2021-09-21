import { SQLTransaction } from 'expo-sqlite';
import { Migration } from './Migration';

export default class Migration20210815InitializeTablesWithInitialData
  implements Migration
{
  public getId(): string {
    return 'Migration20210815InitializeTablesWithInitialData';
  }

  public up(sqlTransaction: SQLTransaction): void {
    sqlTransaction.executeSql(
      'create table if not exists versioning (aggregate varchar not null, version varchar not null);',
    );
    sqlTransaction.executeSql(
      'CREATE UNIQUE INDEX if not exists versioning_aggregate_uindex ON versioning (aggregate);',
    );
    sqlTransaction.executeSql(
      'create table if not exists notification (id integer not null constraint notification_pk primary key autoincrement, notificationType varchar not null, notificationEnabled integer default 1 not null)',
    );
    sqlTransaction.executeSql(
      'create table if not exists articles (id integer not null constraint articles_pk primary key autoincrement, chapter varchar not null, pageIndex integer not null, title text not null, bookType text not null, subTitle text, content blob not null, contentType varchar not null, searchText text not null, level varchar not null, iconFile blob);',
    );
    sqlTransaction.executeSql(
      'create table if not exists calculations (calculationType text not null constraint calculations_pk primary key, listIndex integer not null, title text not null, explanation text not null, articleButtonText varchar not null, calculationImage blob not null, content blob not null, contentType varchar not null, iconFile blob not null);',
    );
    sqlTransaction.executeSql(
      'create table if not exists decisionTrees (id int not null, title text, label text not null, lineLabel varchar, parentId int, content blob, contentType varchar, iconFile blob);',
    );
    sqlTransaction.executeSql(
      "INSERT or ignore INTO notification (notificationType) VALUES ('noInternetConnection');",
    );
    sqlTransaction.executeSql(
      "INSERT or ignore INTO versioning (aggregate, version) VALUES ('decisionTrees', 'initial');",
    );
    sqlTransaction.executeSql(
      "INSERT or ignore INTO versioning (aggregate, version) VALUES ('configurations', 'initial');",
    );
    sqlTransaction.executeSql(
      "INSERT or ignore INTO versioning (aggregate, version) VALUES ('calculations', 'initial');",
    );
  }
}
