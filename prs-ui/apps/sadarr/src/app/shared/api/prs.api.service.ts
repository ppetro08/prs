import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSettings, API_SETTINGS } from './app-settings';

@Injectable({ providedIn: 'root' })
export class PrsApiService {
  public url: string;
  public headers: HttpHeaders;

  constructor(
    @Inject(API_SETTINGS) apiSettings: ApiSettings,
    private http: HttpClient
  ) {
    if (apiSettings) {
      const { url } = apiSettings;
      this.url = url;
    }
  }

  public get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.url}/${endpoint}`, {
      headers: this.headers,
    });
  }

  public getSingle<T>(endpoint: string, id: number): Observable<T> {
    return this.get<T>(`${endpoint}/${id}`);
  }

  public post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.url}/${endpoint}`, body, {
      headers: this.headers,
    });
  }

  public getHeaders(): HttpHeaders {
    return this.headers;
  }

  public setHeaders(headers: HttpHeaders) {
    this.headers = headers;
  }
}
