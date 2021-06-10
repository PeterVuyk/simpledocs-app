export interface DecisionTreeStep {
  title: string;
  id: number;
  label: string;
  lineLabel?: string;
  parentId?: number;
  regulationChapter?: string;
  iconFile?: string;
}
