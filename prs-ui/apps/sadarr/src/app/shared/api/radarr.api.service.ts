import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AddMovieResponseApi,
  MovieLookupApi,
} from '../../radarr/models/radarr-api';
import { RootFolderApi } from '../models/root-folder-api';
import { Profile } from '../profile-select/profile';
import { ExternalApiSettings } from './app-settings';
import { ExternalApiService } from './external.api.service';

@Injectable({ providedIn: 'root' })
export class RadarrApiService {
  // TODO - hide this somehow, update other places as well with api keys
  private readonly apiSettings: ExternalApiSettings = {
    url: 'https://piperopni.ddns.net/radarr/api/v3',
    key: 'X-Api-Key',
    value: '4020ff99a9774d62b03e519964cf8497',
  };

  constructor(private externalApiService: ExternalApiService) {
    // TODO - Is there a better way to do this?
    this.externalApiService.setHeaders(this.apiSettings);
  }

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
