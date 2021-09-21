import Migration20210815InitializeTablesWithInitialData from './Migration20210815InitializeTablesWithInitialData';
import Migration20210920InsertScrollTipNotification from './Migration20210920InsertScrollTipNotification';
import { Migration } from './Migration';

const migrations: Migration[] = [
  new Migration20210920InsertScrollTipNotification(),
  new Migration20210815InitializeTablesWithInitialData(),
];

export default migrations;
