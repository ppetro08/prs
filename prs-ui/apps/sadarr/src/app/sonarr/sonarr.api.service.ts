import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExternalApiSettings } from '../shared/api/app-settings';
import { ExternalApiService } from '../shared/api/external.api.service';
import { RootFolderApi } from '../shared/models/root-folder-api';
import { Profile } from '../shared/profile-select/profile';
import { SeriesApi } from './model/series-api';

// TODO:P - Find out what takes so long when getting alot of results 'blacklis'
@Injectable()
export class SonarrApiService {
  private readonly apiSettings: ExternalApiSettings = {
    url: 'https://piperopni.ddns.net/sonarr/api/v3',
    key: 'X-Api-Key',
    value: '2ae85b65c2104fd1a85e4781d274d899',
  };

  constructor(private externalApiService: ExternalApiService) {}

  loadAllSeries(): Observable<SeriesApi[]> {
    return this.externalApiService.get<SeriesApi[]>('series');
  }

  loadProfiles(): Observable<Profile[]> {
    return this.externalApiService.get<Profile[]>('qualityprofile');
  }

  loadRootFolder(): Observable<RootFolderApi[]> {
    return this.externalApiService.get<RootFolderApi[]>('rootFolder');
  }

  search(searchText: string): Observable<SeriesApi[]> {
    return this.externalApiService
      .get<SeriesApi[]>(`series/lookup?term=${searchText}`)
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
