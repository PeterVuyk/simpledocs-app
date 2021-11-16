import { ContentType } from '../ContentType';

export interface Article {
  id: string;
  pageIndex: number;
  chapter: string;
  chapterDivision: string;
  title: string;
  subTitle: string;
  searchText: string;
  iconFile: string;
  contentType: ContentType;
  content: string;
  bookmarked: boolean;
  bookType: string;
}

export interface ApiArticle extends Article, Omit<Article, 'bookType'> {}
