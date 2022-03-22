import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExternalApiSettings, EXTERNAL_API_SETTINGS } from './app-settings';
import { BaseApiService } from './base.api.service';

@Injectable()
export class ExternalApiService extends BaseApiService {
  constructor(
    @Inject(EXTERNAL_API_SETTINGS) apiSettings: ExternalApiSettings,
    http: HttpClient
  ) {
    super(http);
    if (apiSettings) {
      const { url, key, value } = apiSettings;
      this.url = url;
      if (key) {
        this.headers = new HttpHeaders({
          [key]: value,
        });
      }
    }
  }

  public get<T>(endpoint: string): Observable<T> {
    return super.get<T>(endpoint);
  }

  public getSingle<T>(endpoint: string, id: number): Observable<T> {
    return super.get<T>(`${endpoint}/${id}`);
  }

  public post<T>(endpoint: string, body: any): Observable<T> {
    return super.post<T>(endpoint, body);
  }
}
