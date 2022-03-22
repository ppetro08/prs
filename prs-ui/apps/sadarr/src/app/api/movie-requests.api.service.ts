import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieLookupApi } from '../radarr/models/radarr-api';
import { PrsApiService } from '../shared/api/prs.api.service';
import { MovieRequest } from './models/movie-request.model';

@Injectable()
export class MovieRequestsApiService {
  constructor(private prsApiService: PrsApiService) {}
  getAllRequests(): Observable<MovieRequest[]> {
    return this.prsApiService.get<MovieRequest[]>(`MovieRequest`);
  }

  getUserRequests(userId: number): Observable<MovieRequest[]> {
    return this.prsApiService.get<MovieRequest[]>(`MovieRequest/${userId}`);
  }

  addRequest(movieLookupApi: MovieLookupApi): Observable<MovieRequest> {
    return this.prsApiService.post<MovieRequest>(
      `MovieRequest`,
      movieLookupApi
    );
  }
}
