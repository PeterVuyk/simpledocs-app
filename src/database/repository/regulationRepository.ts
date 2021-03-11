import openDatabase from './../openDatabase';

export interface Regulation {
  // eslint-disable-next-line camelcase
  page_index: number;
  chapter: string;
  level: string;
  title: string;
  // eslint-disable-next-line camelcase
  sub_title: string;
  body: string;
  // eslint-disable-next-line camelcase
  search_text: string;
  icon: string;
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

function addRegulation(regulation: Regulation): void {
  openDatabase.then(connection => {
    connection.transaction(tx => {
      tx.executeSql(
        'INSERT INTO regulation (chapter, page_index, title, sub_title, body, search_text, level, icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          regulation.chapter,
          regulation.page_index,
          regulation.title,
          regulation.sub_title,
          regulation.body,
          regulation.search_text,
          regulation.level,
          regulation.icon,
        ],
        (txCallback, results) => {
          if (results.rowsAffected !== 0) {
            console.log(
              'database insertion for regulation has failed:',
              regulation.chapter,
            );
          }
        },
      );
    });
  });
}

function addRegulations(regulations: Regulation[]): void {
  regulations.forEach(value => addRegulation(value));
}

function removeAllRegulations(): void {
  openDatabase.then(connection => {
    connection.transaction(tx => {
      tx.executeSql(`DELETE FROM regulation`, [], (txCallback, results) => {
        console.log('TODO: Hier een console .log toevoegen als t fout gaat');
      });
    });
  });
}

const regulationRepository = {
  getRegulationByChapter,
  searchRegulations,
  getChaptersSection,
  addRegulations,
  removeAllRegulations,
};

export default regulationRepository;
