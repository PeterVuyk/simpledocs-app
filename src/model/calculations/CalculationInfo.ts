import { ContentType } from '../ContentType';

export interface CalculationInfo {
  calculationType: string;
  title: string;
  explanation: string;
  content: string;
  contentType: ContentType;
}
