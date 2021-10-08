import { AppConfigurations } from './AppConfigurations';

export interface Versioning {
  version: string;
  isBookType: boolean;
}

interface Aggregate {
  [key: string]: Versioning;
}

export interface SystemConfigurations {
  appConfigurations?: AppConfigurations;
  versions: Aggregate;
}
