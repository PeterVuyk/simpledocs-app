import {
  FIRST_BOOK_TAB,
  SECOND_BOOK_TAB,
  THIRD_BOOK_TAB,
} from '../model/BottomTab';
import { BookInfo, Versions } from '../model/configurations/AppConfigurations';
import configurationsStorage from '../storage/configurationsStorage';

const getBookTypes = async (): Promise<BookInfo[]> => {
  const config = await configurationsStorage.getSystemConfiguration();
  const bookTypesFirstBookTab =
    config!.appConfigurations!.firstBookTab.bookTypes.sort(
      (a, b) => a.index - b.index,
    );
  const bookTypesSecondBookTab =
    config!.appConfigurations!.secondBookTab.bookTypes.sort(
      (a, b) => a.index - b.index,
    );
  const bookTypesThirdBookTab =
    config!.appConfigurations!.thirdBookTab.bookTypes.sort(
      (a, b) => a.index - b.index,
    );
  return [
    ...bookTypesFirstBookTab,
    ...bookTypesSecondBookTab,
    ...bookTypesThirdBookTab,
  ];
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
    config!.appConfigurations!.firstBookTab.bookTypes.find(
      value => value.bookType === bookType,
    )
  ) {
    return FIRST_BOOK_TAB;
  }
  if (
    config!.appConfigurations!.secondBookTab.bookTypes.find(
      value => value.bookType === bookType,
    )
  ) {
    return SECOND_BOOK_TAB;
  }
  if (
    config!.appConfigurations!.thirdBookTab.bookTypes.find(
      value => value.bookType === bookType,
    )
  ) {
    return THIRD_BOOK_TAB;
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
