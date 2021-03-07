import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

async function openDatabase(): Promise<SQLite.WebSQLDatabase> {
  if (
    !(await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
    ).catch(reason => console.log(reason));
  }

  await FileSystem.downloadAsync(
    Asset.fromModule(require('../../assets/db.db')).uri,
    `${FileSystem.documentDirectory}SQLite/ambulancezorg-app.db`,
  ).catch(reason => console.log(reason));
  return SQLite.openDatabase('ambulancezorg-app.db');
}

export default openDatabase();
