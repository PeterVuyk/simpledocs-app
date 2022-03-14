import { Migration } from './Migration';
import Migration20220314DropDecisionTreeAndCalculations from './Migration20220314DropDecisionTreeAndCalculations';

/**
 * Add the latest migrations at the top of the array. Make sure the Migration implement the 'Migration' interface.
 */
const migrations: Migration[] = [
  new Migration20220314DropDecisionTreeAndCalculations(),
];

export default migrations;
