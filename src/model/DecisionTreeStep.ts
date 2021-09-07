import { ContentType } from './ContentType';

export interface DecisionTreeStep {
  title: string;
  id: number;
  label: string;
  lineLabel?: string;
  parentId?: number;
  content: string;
  contentType: ContentType;
  iconFile?: string;
}
