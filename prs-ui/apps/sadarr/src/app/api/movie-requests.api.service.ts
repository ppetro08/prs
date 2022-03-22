import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrsApiService } from '../shared/api/prs.api.service';
import { MovieRequest, MovieRequestAdd } from './models/movie-request.model';

@Injectable()
export class MovieRequestsApiService {
  constructor(private prsApiService: PrsApiService) {}
  getAllRequests(): Observable<MovieRequest[]> {
    return this.prsApiService.get<MovieRequest[]>(`MovieRequest`);
  }

  getUserRequests(userId: number): Observable<MovieRequest[]> {
    return this.prsApiService.get<MovieRequest[]>(`MovieRequest/${userId}`);
  }

  addRequest(movieRequestAdd: MovieRequestAdd): Observable<MovieRequest> {
    return this.prsApiService.post<MovieRequest>(
      `MovieRequest`,
      movieRequestAdd
    );
  }
}
