import { IconFamilyType } from './IconFamilyType';

interface BottomTab {
  familyType: IconFamilyType;
  icon: string;
  title: string;
}

export interface ArticleInfo {
  index: number;
  articleType: string;
  title: string;
  subTitle?: string;
  iconFile?: string;
}

export interface TabInfo {
  bottomTab: BottomTab;
  articleTypes: ArticleInfo[];
  title?: string;
  subTitle?: string;
}

export interface ConfigInfo {
  firstTab: TabInfo;
  secondTab: TabInfo;
  defaultArticleTypeSearch: string;
}
