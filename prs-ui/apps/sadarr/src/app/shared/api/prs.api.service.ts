import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InternalApiSettings, INTERNAL_API_SETTINGS } from './app-settings';
import { BaseApiService } from './base.api.service';

@Injectable({ providedIn: 'root' })
export class PrsApiService extends BaseApiService {
  constructor(
    @Inject(INTERNAL_API_SETTINGS) apiSettings: InternalApiSettings,
    http: HttpClient
  ) {
    super(http);
    if (apiSettings) {
      const { url } = apiSettings;
      this.url = url;
    }
  }

  public get<T>(endpoint: string): Observable<T> {
    return super.get<T>(endpoint);
  }

  public getSingle<T>(endpoint: string, id: number): Observable<T> {
    return super.get<T>(`${endpoint}/${id}`);
  }

  // TODO - Add return type for body
  public post<T>(endpoint: string, body: any): Observable<T> {
    return super.post<T>(endpoint, body);
  }

  public getHeaders(): HttpHeaders {
    return this.headers;
  }

  public setHeaders(headers: HttpHeaders) {
    this.headers = headers;
  }
}
