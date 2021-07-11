import reduxTypes from './reduxTypes';

export interface SearchText {
  chapter: string;
  searchText: string;
  articleType: string | null;
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
