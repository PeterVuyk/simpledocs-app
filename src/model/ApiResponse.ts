import { CalculationInfo } from './CalculationInfo';
import { AppConfigurations } from './AppConfigurations';
import { DecisionTreeStep } from './DecisionTreeStep';
import { Article } from './Article';
import { AggregateVersions } from './AggregateVersions';

export interface CalculationResponse {
  success: boolean;
  result: CalculationInfo[];
  message: string | null;
}

export interface AppConfigurationsResponse {
  success: boolean;
  result: AppConfigurations | null;
  message: string | null;
}

export interface DecisionTreeResponse {
  success: boolean;
  result: DecisionTreeStep[];
  message: string | null;
}

export interface ArticlesResponse {
  success: boolean;
  result: Article[];
  message: string | null;
}
