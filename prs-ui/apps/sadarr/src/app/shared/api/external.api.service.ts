import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExternalApiSettings } from './app-settings';
import { BaseApiService } from './base.api.service';

@Injectable({ providedIn: 'root' })
export class ExternalApiService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
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

  public setHeaders(apiSettings: ExternalApiSettings): void {
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
}
