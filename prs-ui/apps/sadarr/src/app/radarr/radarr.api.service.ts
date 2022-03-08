import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrsApiService } from '../shared/api/prs.api.service';
import { RootFolderApi } from '../shared/models/root-folder-api';
import { Profile } from '../shared/profile-select/profile';
import { AddMovieResponseApi, MovieLookupApi } from './models/radarr-api';

@Injectable()
export class RadarrApiService {
  constructor(private prsApiService: PrsApiService) {}

  addMovie(movie: MovieLookupApi): Observable<AddMovieResponseApi> {
    return this.prsApiService.post<AddMovieResponseApi>('movie', movie);
  }

  getMovie(id: number): Observable<MovieLookupApi> {
    return this.prsApiService.getSingle<MovieLookupApi>('movie', id);
  }

  loadAllMovies(): Observable<MovieLookupApi[]> {
    return this.prsApiService.get<MovieLookupApi[]>('movie');
  }

  loadProfiles(): Observable<Profile[]> {
    return this.prsApiService.get<Profile[]>(`qualityprofile`);
  }

  loadRootFolder(): Observable<RootFolderApi[]> {
    return this.prsApiService.get<RootFolderApi[]>(`rootFolder`);
  }

  search(searchText: string): Observable<MovieLookupApi[]> {
    return this.prsApiService
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
