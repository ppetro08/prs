import { InjectionToken } from '@angular/core';

export interface ApiSettings {
  url: string;
}

export const API_SETTINGS = new InjectionToken<ApiSettings>('Api Settings');
