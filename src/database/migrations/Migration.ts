import { SQLTransaction } from 'expo-sqlite';

export interface Migration {
  up(sqlTransaction: SQLTransaction): void;
  getId(): string;
}
