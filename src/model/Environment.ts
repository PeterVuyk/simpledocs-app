export const DEVELOPMENT_ENVIRONMENT = 'development';
export const STAGING_ENVIRONMENT = 'staging';
export const PRODUCTION_ENVIRONMENT = 'production';

export interface Environment {
  envName: string;
  dbUrl: string;
  apiKey: string;
}
