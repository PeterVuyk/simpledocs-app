import logger from '../../../util/logger';
import configurationsHelper from '../../../helper/configurationsHelper';
import { StandalonePage } from '../../../model/standalonePages/StandalonePage';
import { AGGREGATE_STANDALONE_PAGES } from '../../../model/aggregate';
import standalonePagesStorage from '../../../storage/standalonePagesStorage';

const updateStandalonePages = async (
  serverVersion: string,
  standalonePages: StandalonePage[],
) => {
  return standalonePagesStorage
    .storeStandalonePages(standalonePages)
    .then(() => {
      configurationsHelper.updateVersioning(AGGREGATE_STANDALONE_PAGES, {
        version: serverVersion,
        isBookType: false,
      });
    })
    .catch(reason =>
      logger.error(
        `Update version ${serverVersion} for standalonePages failed. By the next startup the standalonePages will be fetched again, the update version will be tried to store again`,
        reason,
      ),
    );
};

const synchronizeStorage = {
  updateStandalonePages,
};

export default synchronizeStorage;
