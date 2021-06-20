import { ArticleType } from './ArticleType';

export interface DecisionTreeStep {
  title: string;
  id: number;
  label: string;
  lineLabel?: string;
  parentId?: number;
  articleType: ArticleType;
  articleChapter?: string;
  iconFile?: string;
}
