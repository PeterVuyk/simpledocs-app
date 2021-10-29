import { FIRST_BOOK_TAB, SECOND_BOOK_TAB } from '../model/BookTab';
import {
  AppConfigurations,
  BookInfo,
  Versions,
} from '../model/AppConfigurations';
import configurationsStorage from '../configurations/configurationsStorage';

const getBookTypes = async (): Promise<BookInfo[]> => {
  const config = await configurationsStorage.getSystemConfiguration();
  const bookTypesFirstTab = config!.appConfigurations!.firstTab.bookTypes.sort(
    (a, b) => a.index - b.index,
  );
  const bookTypesSecondTab =
    config!.appConfigurations!.secondTab.bookTypes.sort(
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
  const config = await configurationsStorage.getSystemConfiguration();
  if (
    config!.appConfigurations!.firstTab.bookTypes.find(
      value => value.bookType === bookType,
    )
  ) {
    return FIRST_BOOK_TAB;
  }
  if (
    config!.appConfigurations!.secondTab.bookTypes.find(
      value => value.bookType === bookType,
    )
  ) {
    return SECOND_BOOK_TAB;
  }
  return null;
};

const overWriteVersions = (versions: Versions) => {
  const result = versions;
  for (const version of Object.keys(versions)) {
    result[version].version = new Date().getTime().toString();
  }
  return result;
};

const configHelper = {
  getTabByBookType,
  getBookTypes,
  getConfigByBookType,
  overWriteVersions,
};

export default configHelper;
