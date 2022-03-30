import { createAction, props } from '@ngrx/store';
import { RootFolderApi } from '../../shared/models/root-folder-api';
import { Profile } from '../../shared/profile-select/profile';
import { SeriesApi } from '../model/series-api';
import { SonarrEntity } from './sonarr.models';

export const sonarrInit = createAction('[Sonarr Page] Init');
export const sonarrInitSuccess = createAction(
  '[Sonarr/API] Sonarr Init Success',
  props<{
    entities: SonarrEntity[];
    profiles: Profile[];
    rootFolders: RootFolderApi[];
  }>()
);
export const sonarrInitFailure = createAction(
  '[Sonarr/API] Sonarr init Failure',
  props<{ error: any }>()
);

export const search = createAction(
  '[Sonarr/API] Search',
  props<{ searchText: string }>()
);
export const searchSuccess = createAction(
  '[Sonarr/API] Search Success',
  props<{ series: SeriesApi[] }>()
);
export const searchFailure = createAction(
  '[Sonarr/API] Search Failure',
  props<{ error: any }>()
);
export const clearSearch = createAction('[Sonarr/API] Clear Search');
