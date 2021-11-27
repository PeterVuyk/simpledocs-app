export const DEVELOPMENT_ENVIRONMENT = 'development';
export const STAGING_ENVIRONMENT = 'staging';
export const PRODUCTION_ENVIRONMENT = 'production';

export const CUSTOMER_DEFAULT = 'default';
export const CUSTOMER_ACADEMIE_AMBULANCEZORG = 'academie-voor-ambulancezorg';

export interface Environment {
  customer: string;
  envName: string;
}
