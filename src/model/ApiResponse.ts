import { CalculationInfo } from './CalculationInfo';
import { ConfigInfo } from './ConfigInfo';
import { DecisionTreeStep } from './DecisionTreeStep';
import { Article } from './Article';
import { AggregateVersions } from './AggregateVersions';

export interface CalculationResponse {
  success: boolean;
  result: CalculationInfo[];
  message: string | null;
}

export interface ConfigInfoResponse {
  success: boolean;
  result: ConfigInfo | null;
  message: string | null;
}

export interface DecisionTreeResponse {
  success: boolean;
  result: DecisionTreeStep[];
  message: string | null;
}

export interface VersioningResponse {
  success: boolean;
  result: AggregateVersions[];
  message: string | null;
}

export interface ArticlesResponse {
  success: boolean;
  result: Article[];
  message: string | null;
}
