import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import configurationsStorage from '../../../storage/configurationsStorage';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  AUTHENTICATE_STATE,
  RESTORE_APP_FROM_FAILED_STARTUP,
  STARTUP_FAILURE_STATE,
  updateStartupState,
} from '../../../redux/slice/startupStateSlice';
import tearDown from '../restore/tearDownDatabase';
import logger from '../../../util/logger';
import debugHandler from '../../../debug/debugHandler';
import articleRepository from '../../repository/articleRepository';
import { setBookmarks } from '../../../redux/slice/BookmarkSlice';
import { Bookmark } from '../../../model/Bookmark';

interface Props {
  children: ReactNode;
}

const RestoreAppProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { currentState } = useAppSelector(state => state.startupState);

  const preserveArticleFavorites = useCallback(() => {
    return new Promise(resolve => {
      articleRepository
        .getBookmarkedChapters(async articles => {
          const bookmarks = articles.map(value => {
            return { chapter: value.chapter, bookType: value.bookType };
          }) as Bookmark[];
          dispatch(setBookmarks(bookmarks));
          resolve();
        })
        .catch(() => {
          // an exception can occur if the database for example doesn't exist
          resolve();
        });
    });
  }, [dispatch]);

  const restore = useCallback(async () => {
    await debugHandler
      .dumpConfigToStorage()
      .then(preserveArticleFavorites)
      .then(tearDown.down)
      .then(configurationsStorage.removeSystemConfiguration)
      .then(() => {
        dispatch(updateStartupState(AUTHENTICATE_STATE));
      })
      .catch(reason => {
        logger.error(
          'RestoreAppProvider Tried to recover but failed resulting in a failure state',
          reason,
        );
        dispatch(updateStartupState(STARTUP_FAILURE_STATE));
      });
  }, [dispatch, preserveArticleFavorites]);

  useEffect(() => {
    if (currentState === RESTORE_APP_FROM_FAILED_STARTUP) {
      restore();
    }
  }, [currentState, dispatch, restore]);

  return <>{children}</>;
};

export default RestoreAppProvider;
