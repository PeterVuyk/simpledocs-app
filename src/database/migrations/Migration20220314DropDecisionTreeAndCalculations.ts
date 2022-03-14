import { SQLTransaction } from 'expo-sqlite';
import { Migration } from './Migration';

export default class Migration20220314DropDecisionTreeAndCalculations
  implements Migration
{
  public getId(): string {
    return 'Migration20220314DropDecisionTreeAndCalculations';
  }

  public up(sqlTransaction: SQLTransaction): void {
    sqlTransaction.executeSql('DROP TABLE if exists calculations;');
    sqlTransaction.executeSql('DROP TABLE if exists decisionTrees;');
  }
}
