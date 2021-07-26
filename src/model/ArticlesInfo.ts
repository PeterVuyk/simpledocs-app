import { IconFamilyType } from './IconFamilyType';

interface BottomTab {
  familyType: IconFamilyType;
  icon: string;
  title: string;
}

interface ArticleInfo {
  index: number;
  articleType: string;
  title?: string;
  subTitle?: string;
  iconFile?: string;
}

export interface ArticlesInfo {
  title?: string;
  subTitle?: string;
  articleTypes: ArticleInfo[];
  bottomTab: BottomTab;
  defaultArticleTypeSearch: string;
}
