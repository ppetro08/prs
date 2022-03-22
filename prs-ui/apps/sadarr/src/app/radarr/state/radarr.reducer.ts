import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { MovieRequest } from '../../api/models/movie-request.model';
import { RootFolderApi } from '../../shared/models/root-folder-api';
import { Profile } from '../../shared/profile-select/profile';
import { MovieLookupApi } from '../models/radarr-api';
import * as RadarrActions from './radarr.actions';

export const RADARR_FEATURE_KEY = 'radarr';

// TODO - Need to track if a movie has been requested in the search results

export interface State extends EntityState<MovieLookupApi> {
  error?: string | null; // last known error (if any)
  loading: boolean;
  movieRequestSet: Set<number> | null;
  movieRequests: MovieRequest[];
  profiles: Profile[];
  rootFolders: RootFolderApi[];
  searchLoading: boolean | null;
  searchResults: MovieLookupApi[];
  searchText: string | null;
}

export interface RadarrPartialState {
  readonly [RADARR_FEATURE_KEY]: State;
}

export function sortComparer(a: MovieLookupApi, b: MovieLookupApi): number {
  return a.title.localeCompare(b.title);
}

export const radarrAdapter: EntityAdapter<MovieLookupApi> =
  createEntityAdapter<MovieLookupApi>({ sortComparer });

export const initialState: State = radarrAdapter.getInitialState({
  loading: false,
  movieRequestSet: null,
  movieRequests: [],
  profiles: [],
  rootFolders: [],
  searchLoading: null,
  searchResults: [],
  searchText: null,
});

const radarrReducer = createReducer(
  initialState,

  // init
  on(RadarrActions.radarrInit, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),
  on(
    RadarrActions.radarrInitSuccess,
    (
      state,
      { entities, profiles, rootFolders, movieRequestSet, movieRequests }
    ) =>
      radarrAdapter.setAll(entities, {
        ...state,
        loaded: true,
        profiles,
        rootFolders,
        movieRequestSet,
        movieRequests,
      })
  ),
  on(RadarrActions.radarrInitFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // search
  on(RadarrActions.search, (state, action) => ({
    ...state,
    error: null,
    searchLoading: true,
    searched: true,
    searchText: action.searchText,
  })),
  on(RadarrActions.searchSuccess, (state, action) => ({
    ...state,
    loading: true,
    searchLoading: false,
    searchResults: action.movies,
  })),
  on(RadarrActions.searchFailure, (state, { error }) => ({
    ...state,
    error,
    searchLoading: false,
  })),
  on(RadarrActions.clearSearch, (state) => ({
    ...state,
    searchLoading: false,
    searchText: '',
    searchResults: [],
  })),

  // add
  on(RadarrActions.addMovie, (state) => ({
    ...state,
    searchLoading: true,
  })),
  on(RadarrActions.addMovieSuccess, (state, action) => {
    const searchResults = [...state.searchResults];
    let index = state.searchResults.findIndex(
      (sr) => sr.tmdbId === action.addedMovie.tmdbId
    );
    if (index > -1) {
      searchResults[index] = action.addedMovie;
    }

    return {
      ...radarrAdapter.addOne(action.addedMovie, state),
      searchLoading: false,
      searchResults,
    };
  }),
  on(RadarrActions.addMovieFailure, (state, { error }) => ({
    ...state,
    searchLoading: false,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return radarrReducer(state, action);
}
