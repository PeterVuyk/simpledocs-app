import logger from '../../../util/logger';
import updateBookPageTable from './updateBookPageTable';
import configurationsHelper from '../../../helper/configurationsHelper';
import { ApiBookPage } from '../../../model/bookPages/BookPage';

const updateBook = async (
  bookType: string,
  serverVersion: string,
  apiBookPages: ApiBookPage[],
) => {
  return updateBookPageTable
    .updateBookPages(apiBookPages, serverVersion, bookType)
    .then(() => {
      configurationsHelper.updateVersioning(bookType, {
        version: serverVersion,
        isBookType: true,
      });
    })
    .catch(reason =>
      logger.error(
        `Update version ${serverVersion} for pages bookType ${bookType} failed. By the next startup the pages will be fetched again, the update version will be tried to store again`,
        reason,
      ),
    );
};

const synchronizeDatabase = {
  updateBook,
};

export default synchronizeDatabase;
