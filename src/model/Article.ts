import { ContentType } from './ContentType';

export interface Article {
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
}
