import Migration20210815InitializeTablesWithInitialData from './Migration20210815InitializeTablesWithInitialData';
import Migration20210922AlterCalculationsTableContent from './Migration20210922AlterCalculationsTableContent';
import Migration20210920InsertScrollTipNotification from './Migration20210920InsertScrollTipNotification';
import Migration20211101RenameLevelToChapterDivision from './Migration20211101RenameLevelToChapterDivision';
import { Migration } from './Migration';

const migrations: Migration[] = [
  new Migration20211101RenameLevelToChapterDivision(),
  new Migration20210922AlterCalculationsTableContent(),
  new Migration20210920InsertScrollTipNotification(),
  new Migration20210815InitializeTablesWithInitialData(),
];

export default migrations;
