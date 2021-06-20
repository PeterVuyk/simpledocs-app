import reduxTypes from './reduxTypes';
import { ArticleType } from '../../model/ArticleType';

export interface SearchText {
  chapter: string;
  searchText: string;
  articleType: ArticleType | null;
}

const setChapterSearchText = (searchText: SearchText) => ({
  type: reduxTypes.SEARCH_CHAPTER_TEXT,
  data: {
    searchText: searchText.searchText,
    chapter: searchText.chapter,
    articleType: searchText.articleType,
  },
});

const searching = {
  setChapterSearchText,
};

export default searching;
