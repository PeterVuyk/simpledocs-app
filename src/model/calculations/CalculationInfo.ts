import { ContentType } from '../ContentType';

export interface CalculationInfo {
  listIndex: number;
  calculationType: string;
  title: string;
  explanation: string;
  content: string;
  contentType: ContentType;
  iconFile: string;
}
