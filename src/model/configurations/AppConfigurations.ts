import { IconFamilyType } from '../style/IconFamilyType';

export interface BottomTab {
  familyType: IconFamilyType;
  icon: string;
  title: string;
}

export interface BookInfo {
  index: number;
  bookType: string;
  title: string;
  chapterDivisionsInList: string[];
  chapterDivisionsInIntermediateList: string[];
  subTitle?: string;
  imageFile: string;
}

export interface BookTabInfo {
  bottomTab: BottomTab;
  bookTypes: BookInfo[];
  title?: string;
  subTitle?: string;
}

export interface VersionInfo {
  isBookType: boolean;
  version: string;
}

export interface LinkItem {
  title: string;
  url: string;
  index: string;
  iconName: string;
  iconType: string;
}

export interface EnabledStandalonePagesTypes {
  [key: string]: boolean;
}

export interface Drawer {
  links: LinkItem[];
  enabledStandalonePagesTypes: EnabledStandalonePagesTypes;
}

export interface Versions {
  [key: string]: VersionInfo;
}

export interface AppConfigurations {
  firstBookTab: BookTabInfo;
  secondBookTab: BookTabInfo;
  thirdBookTab: BookTabInfo;
  drawer: Drawer;
  versioning: Versions;
}
