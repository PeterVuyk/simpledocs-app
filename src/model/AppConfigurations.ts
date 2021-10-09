import { IconFamilyType } from './IconFamilyType';

export interface BottomTab {
  familyType: IconFamilyType;
  icon: string;
  title: string;
}

export interface BookInfo {
  index: number;
  bookType: string;
  title: string;
  showLevelsInList: string[];
  showLevelsInIntermediateList: string[];
  subTitle?: string;
  iconFile?: string;
}

export interface DecisionsTab {
  bottomTab: BottomTab;
  title: string;
  subTitle: string;
  indexDecisionType: string[];
}

export interface TabInfo {
  bottomTab: BottomTab;
  bookTypes: BookInfo[];
  title?: string;
  subTitle?: string;
}

export interface VersionInfo {
  isBookType: boolean;
  version: string;
}

export interface Versions {
  [key: string]: VersionInfo;
}

export interface AppConfigurations {
  firstTab: TabInfo;
  secondTab: TabInfo;
  decisionsTab: DecisionsTab;
  defaultBookTypeSearch: string;
  defaultInitialTab: string;
  versioning: Versions;
}
