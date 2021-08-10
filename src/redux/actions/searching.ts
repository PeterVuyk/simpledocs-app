import reduxTypes from './reduxTypes';

export interface SearchText {
  chapter: string;
  searchText: string;
  bookType: string | null;
}

const setChapterSearchText = (searchText: SearchText) => ({
  type: reduxTypes.SEARCH_CHAPTER_TEXT,
  data: {
    searchText: searchText.searchText,
    chapter: searchText.chapter,
    bookType: searchText.bookType,
  },
});

const searching = {
  setChapterSearchText,
};

export default searching;
