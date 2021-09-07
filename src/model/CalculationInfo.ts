import { ContentType } from './ContentType';

export interface CalculationInfo {
  listIndex: number;
  calculationType: string;
  title: string;
  explanation: string;
  calculationImage: string;
  articleButtonText: string;
  content: string;
  contentType: ContentType;
  iconFile: string;
}
