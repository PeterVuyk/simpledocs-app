export interface InfoBookPage {
  id: string;
  title: string;
  subTitle?: string;
  chapter: string;
  iconFile: string;
  chapterDivision: string;
  pageIndex: number;
  bookmarked: boolean;
  bookType: string;
}
