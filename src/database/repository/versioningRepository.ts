import openDatabase from './../openDatabase';

export interface Versioning {
  aggregate: string;
  version: string;
}

type setVersioningCallback = (
  versioning: React.SetStateAction<Versioning | null | undefined>,
) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
function getVersioning(
  aggregate: string,
  setVersioning: setVersioningCallback,
): void {
  openDatabase.then(connection => {
    connection.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM versioning WHERE aggregate = ? LIMIT 1;`,
        [aggregate],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setVersioning(_array);
        },
      );
    });
  });
}

function updateVersioning(aggregate: string, version: string): void {
  openDatabase.then(connection => {
    connection.transaction(tx => {
      tx.executeSql(
        `UPDATE versioning SET version = ? WHERE aggregate = ?`,
        [aggregate, version],
        (txCallback, results) => {
          console.log('TODO: Hier een console .log toevoegen als t fout gaat');
        },
      );
    });
  });
}

const versioningRepository = {
  getVersioning,
};

export default versioningRepository;
