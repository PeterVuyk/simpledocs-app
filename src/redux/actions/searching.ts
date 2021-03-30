import reduxTypes from './reduxTypes';

export interface SearchText {
  chapter: string;
  searchText: string;
}

const setChapterSearchText = (searchText: SearchText) => ({
  type: reduxTypes.SEARCH_CHAPTER_TEXT,
  data: { searchText: searchText.searchText, chapter: searchText.chapter },
});

const searching = {
  setChapterSearchText,
};

export default searching;
