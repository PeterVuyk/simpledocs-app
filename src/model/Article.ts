import { ContentType } from './ContentType';

export interface Article {
  pageIndex: number;
  chapter: string;
  level: string;
  title: string;
  subTitle: string;
  searchText: string;
  iconFile: string;
  contentType: ContentType;
  content: string;
}
