import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieLookupApi } from '../radarr/models/radarr-api';
import { PrsApiService } from '../shared/api/prs.api.service';
import {
  MovieRequestAddApi,
  MovieRequestApi,
} from './models/movie-request.model';

@Injectable()
export class MovieRequestsApiService {
  private readonly endpoint = 'movieRequest';

  constructor(private prsApiService: PrsApiService) {}

  addMovie(
    tmdbId: number,
    qualityProfileId?: number
  ): Observable<MovieLookupApi> {
    let url = `${this.endpoint}/AddMovie?tmdbId=${tmdbId}`;
    if (qualityProfileId) {
      url += `&qualityProfileId=${qualityProfileId}`;
    }
    return this.prsApiService.post(url, null);
  }

  addMovieRequest(
    movieRequestAdd: MovieRequestAddApi
  ): Observable<MovieRequestApi> {
    return this.prsApiService.post<MovieRequestApi>(
      this.endpoint,
      movieRequestAdd
    );
  }

  approveMovieRequest(id: number): Observable<Date> {
    return this.prsApiService.post<Date>(
      `${this.endpoint}/${id}/ApproveMovieRequest`,
      null
    );
  }

  getAllRequests(): Observable<MovieRequestApi[]> {
    // TODO - This is getting called before header is being set after login
    return this.prsApiService.get<MovieRequestApi[]>(this.endpoint);
  }

  getUserRequests(userId: number): Observable<MovieRequestApi[]> {
    return this.prsApiService.get<MovieRequestApi[]>(
      `${this.endpoint}/${userId}`
    );
  }
}
