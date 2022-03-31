import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieLookupApi } from '../../radarr/models/radarr-api';
import { Profile } from '../profile-select/profile';
import { PrsApiService } from './prs.api.service';

@Injectable({ providedIn: 'root' })
export class RadarrApiService {
  private readonly endpoint = 'api/radarr';

  constructor(private prsApiService: PrsApiService) {}

  getMovie(id: number): Observable<MovieLookupApi> {
    return this.prsApiService.getSingle<MovieLookupApi>(
      `${this.endpoint}/movie`,
      id
    );
  }

  loadAllMovies(): Observable<MovieLookupApi[]> {
    return this.prsApiService.get<MovieLookupApi[]>(`${this.endpoint}/movie`);
  }

  loadProfiles(): Observable<Profile[]> {
    return this.prsApiService.get<Profile[]>(`${this.endpoint}/qualityprofile`);
  }

  search(searchText: string): Observable<MovieLookupApi[]> {
    return this.prsApiService
      .get<MovieLookupApi[]>(`${this.endpoint}/movie/lookup?term=${searchText}`)
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
