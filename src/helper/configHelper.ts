import { FIRST_BOOK_TAB, SECOND_BOOK_TAB } from '../model/BookTab';
import { BookInfo } from '../model/AppConfigurations';
import configurationsDAO from '../fileSystem/configurationsDAO';

const getBookTypes = async (): Promise<BookInfo[]> => {
  const appConfigurations = await configurationsDAO.getAppConfiguration();
  const bookTypesFirstTab = appConfigurations!.firstTab.bookTypes.sort(
    (a, b) => a.index - b.index,
  );
  const bookTypesSecondTab = appConfigurations!.secondTab.bookTypes.sort(
    (a, b) => a.index - b.index,
  );
  return [...bookTypesFirstTab, ...bookTypesSecondTab];
};

const getConfigByBookType = async (
  bookType: string,
): Promise<BookInfo | undefined> => {
  const bookTypes = await getBookTypes();
  return bookTypes.find(value => value.bookType === bookType);
};

const getTabByBookType = async (bookType: string): Promise<string | null> => {
  const appConfigurations = await configurationsDAO.getAppConfiguration();
  if (
    appConfigurations?.firstTab.bookTypes.find(
      value => value.bookType === bookType,
    )
  ) {
    return FIRST_BOOK_TAB;
  }
  if (
    appConfigurations?.secondTab.bookTypes.find(
      value => value.bookType === bookType,
    )
  ) {
    return SECOND_BOOK_TAB;
  }
  return null;
};

const configHelper = {
  getTabByBookType,
  getBookTypes,
  getConfigByBookType,
};

export default configHelper;
