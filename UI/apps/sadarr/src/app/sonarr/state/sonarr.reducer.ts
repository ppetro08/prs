import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { RootFolderApi } from '../../shared/models/root-folder-api';
import { Profile } from '../../shared/profile-select/profile';
import { SeriesApi } from '../model/series-api';
import * as SonarrActions from './sonarr.actions';
import { SonarrEntity } from './sonarr.models';

export const SONARR_FEATURE_KEY = 'sonarr';

export interface State extends EntityState<SonarrEntity> {
  error?: string | null; // last known error (if any)
  loading: boolean;
  profiles: Profile[];
  rootFolders: RootFolderApi[];
  searchLoading: boolean | null;
  searchResults: SeriesApi[];
  searchText: string | null;
}

export interface SonarrPartialState {
  readonly [SONARR_FEATURE_KEY]: State;
}

export const sonarrAdapter: EntityAdapter<SonarrEntity> =
  createEntityAdapter<SonarrEntity>();

export const initialState: State = sonarrAdapter.getInitialState({
  loading: false,
  profiles: [],
  rootFolders: [],
  searchLoading: null,
  searchResults: [],
  searchText: null,
});

const sonarrReducer = createReducer(
  initialState,

  // init
  on(SonarrActions.sonarrInit, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),
  on(
    SonarrActions.sonarrInitSuccess,
    (state, { entities, profiles, rootFolders }) =>
      sonarrAdapter.setAll(entities, {
        ...state,
        loaded: true,
        profiles,
        rootFolders,
      })
  ),
  on(SonarrActions.sonarrInitFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // search
  on(SonarrActions.search, (state, action) => ({
    ...state,
    error: null,
    searchLoading: true,
    searched: true,
    searchText: action.searchText,
  })),
  on(SonarrActions.searchSuccess, (state, action) => ({
    ...state,
    loading: true,
    searchLoading: false,
    searchResults: action.series,
  })),
  on(SonarrActions.searchFailure, (state, { error }) => ({
    ...state,
    error,
    searchLoading: false,
  })),
  on(SonarrActions.clearSearch, (state) => ({
    ...state,
    searchLoading: false,
    searchText: '',
    searchResults: [],
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return sonarrReducer(state, action);
}
