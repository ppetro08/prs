import { InjectionToken } from '@angular/core';
export interface ExternalApiSettings {
  url: string;
  key: string;
  value: string;
}
export interface InternalApiSettings {
  url: string;
}

export const EXTERNAL_API_SETTINGS = new InjectionToken<ExternalApiSettings>(
  'External Api Settings'
);

export const INTERNAL_API_SETTINGS = new InjectionToken<InternalApiSettings>(
  'Internal Api Settings'
);
