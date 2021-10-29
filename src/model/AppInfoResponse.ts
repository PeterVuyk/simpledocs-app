export interface AppInfo {
  [key: string]: any;
}

export interface AppInfoResponse {
  success: boolean;
  result: AppInfo | null;
  message: string | null;
}
