import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrsApiService } from '../shared/api/prs.api.service';
import { RootFolderApi } from '../shared/models/root-folder-api';
import { Profile } from '../shared/profile-select/profile';
import { SeriesApi } from './model/series-api';

// TODO:P - Find out what takes so long when getting alot of results 'blacklis'
@Injectable()
export class SonarrApiService {
  private readonly endpoint = 'api/sonarr';

  constructor(private prsApiService: PrsApiService) {}

  loadAllSeries(): Observable<SeriesApi[]> {
    return this.prsApiService.get<SeriesApi[]>(`${this.endpoint}/series`);
  }

  loadProfiles(): Observable<Profile[]> {
    return this.prsApiService.get<Profile[]>(`${this.endpoint}/qualityprofile`);
  }

  loadRootFolder(): Observable<RootFolderApi[]> {
    return this.prsApiService.get<RootFolderApi[]>(
      `${this.endpoint}/rootFolder`
    );
  }

  search(searchText: string): Observable<SeriesApi[]> {
    return this.prsApiService
      .get<SeriesApi[]>(`${this.endpoint}/series/lookup?term=${searchText}`)
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
