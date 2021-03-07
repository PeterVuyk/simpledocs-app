import openDatabase from './openDatabase';

export interface Regulation {
  index: number;
  chapter: string;
  level: string;
  title: string;
  // eslint-disable-next-line camelcase
  sub_title: string;
  body: string;
  // eslint-disable-next-line camelcase
  search_text: string;
}

type setRegulationCallback = (
  regulations: React.SetStateAction<Regulation | null | undefined>,
) => void;

type setRegulationsCallback = (
  regulations: React.SetStateAction<Regulation[]>,
) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
function getRegulationByChapter(
  chapter: string,
  setRegulations: setRegulationCallback,
): void {
  openDatabase.then(connection => {
    connection.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM regulation WHERE chapter = ?;`,
        [chapter],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          if (_array.length === 1) {
            setRegulations(_array[0]);
          }
        },
      );
    });
  });
}

function searchRegulations(
  text: string,
  setRegulations: setRegulationsCallback,
): void {
  openDatabase.then(connection => {
    connection.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM regulation WHERE title LIKE ? or search_text LIKE ?;`,
        [`%${text}%`, `%${text}%`],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setRegulations(_array);
        },
      );
    });
  });
}

function getChaptersSection(setRegulations: setRegulationsCallback): void {
  openDatabase.then(connection => {
    connection.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM regulation WHERE level = 'section';`,
        [],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setRegulations(_array);
        },
      );
    });
  });
}

const regulationRepository = {
  getRegulationByChapter,
  searchRegulations,
  getChaptersSection,
};

export default regulationRepository;
