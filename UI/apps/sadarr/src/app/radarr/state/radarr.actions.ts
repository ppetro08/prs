import { createAction, props } from '@ngrx/store';
import { MovieRequestApi } from '../../api/models/movie-request.model';
import { RootFolderApi } from '../../shared/models/root-folder-api';
import { AddEvent, RequestEvent } from '../models/radarr';
import { MovieLookupApi } from '../models/radarr-api';

export const radarrInit = createAction('[Radarr Page] Init');
export const radarrInitSuccess = createAction(
  '[Radarr/API] Radarr Init Success',
  props<{
    entities: MovieLookupApi[];
    rootFolders: RootFolderApi[];
  }>()
);
export const radarrInitFailure = createAction(
  '[Radarr/API] Radarr init Failure',
  props<{ error: any }>()
);

export const search = createAction(
  '[Radarr/API] Search',
  props<{ searchText: string }>()
);
export const searchExistingMovies = createAction(
  '[Radarr/API] Search Existing Movies',
  props<{ searchText: string }>()
);
export const searchSuccess = createAction(
  '[Radarr/API] Search Success',
  props<{ movies: MovieLookupApi[] }>()
);
export const searchFailure = createAction(
  '[Radarr/API] Search Failure',
  props<{ error: any }>()
);
export const clearSearch = createAction('[Radarr/API] Clear Search');

export const addMovie = createAction(
  '[Radarr/API] Add Movie',
  props<{ addMovie: AddEvent }>()
);
export const addMovieSuccess = createAction(
  '[Radarr/API] Add Movie Success',
  props<{ addedMovie: MovieLookupApi }>()
);
export const addMovieFailure = createAction(
  '[Radarr/API] Add Movie Failure',
  props<{ error: any }>()
);

// TODO - After requesting, if it was added mark it as approved
export const requestMovie = createAction(
  '[Radarr/API] Request Movie',
  props<{ requestMovie: RequestEvent }>()
);
export const requestMovieSuccess = createAction(
  '[Radarr/API] Request Movie Success',
  props<{ requestedMovie: MovieRequestApi }>()
);
export const requestMovieFailure = createAction(
  '[Radarr/API] Request Movie Failure',
  props<{ error: any }>()
);
