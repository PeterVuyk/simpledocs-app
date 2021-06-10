import { ArticleType } from './ArticleType';

export interface CalculationInfo {
  calculationType: string;
  title: string;
  explanation: string;
  calculationImage: string;
  articleButtonText: string;
  articleType: ArticleType;
  articleChapter: string;
  iconFile: string;
}
