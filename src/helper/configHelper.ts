import { FIRST_BOOK_TAB, SECOND_BOOK_TAB } from '../model/BookTab';
import { BookInfo } from '../model/ConfigInfo';
import appConfigDAO from '../fileSystem/appConfigDAO';

const getBookTypes = async (): Promise<BookInfo[]> => {
  const appConfig = await appConfigDAO.getAppConfig();
  const bookTypesFirstTab = appConfig!.firstTab.bookTypes.sort(
    (a, b) => a.index - b.index,
  );
  const bookTypesSecondTab = appConfig!.secondTab.bookTypes.sort(
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
  const appConfig = await appConfigDAO.getAppConfig();
  if (
    appConfig?.firstTab.bookTypes.find(value => value.bookType === bookType)
  ) {
    return FIRST_BOOK_TAB;
  }
  if (
    appConfig?.secondTab.bookTypes.find(value => value.bookType === bookType)
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
