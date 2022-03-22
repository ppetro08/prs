import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BaseApiService {
  public url: string;
  public headers: HttpHeaders;

  constructor(private http: HttpClient) {}

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
}
