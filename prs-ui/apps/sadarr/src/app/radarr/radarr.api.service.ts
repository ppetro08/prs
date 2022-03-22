import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExternalApiService } from '../shared/api/external.api.service';
import { RootFolderApi } from '../shared/models/root-folder-api';
import { Profile } from '../shared/profile-select/profile';
import { AddMovieResponseApi, MovieLookupApi } from './models/radarr-api';

@Injectable()
export class RadarrApiService {
  constructor(private externalApiService: ExternalApiService) {}

  addMovie(movie: MovieLookupApi): Observable<AddMovieResponseApi> {
    return this.externalApiService.post<AddMovieResponseApi>('movie', movie);
  }

  getMovie(id: number): Observable<MovieLookupApi> {
    return this.externalApiService.getSingle<MovieLookupApi>('movie', id);
  }

  loadAllMovies(): Observable<MovieLookupApi[]> {
    return this.externalApiService.get<MovieLookupApi[]>('movie');
  }

  loadProfiles(): Observable<Profile[]> {
    return this.externalApiService.get<Profile[]>(`qualityprofile`);
  }

  loadRootFolder(): Observable<RootFolderApi[]> {
    return this.externalApiService.get<RootFolderApi[]>(`rootFolder`);
  }

  search(searchText: string): Observable<MovieLookupApi[]> {
    return this.externalApiService
      .get<MovieLookupApi[]>(`movie/lookup?term=${searchText}`)
      .pipe(
        map((results) => {
          if (results.length > 20) {
            return results.slice(0, 20);
          }
          return results;
        })
      );
  }
}
