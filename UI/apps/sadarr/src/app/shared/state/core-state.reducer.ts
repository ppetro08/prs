import { Action, createReducer, on } from '@ngrx/store';
import { MovieRequestApi } from '../../api/models/movie-request.model';
import { appInit } from '../../app.actions';
import { Profile } from '../profile-select/profile';
import * as CoreActions from './core-state.actions';

export const CORE_FEATURE_KEY = 'core-state';

// TODO - Models used here should probably be moved to shared or something
export interface State {
  error?: string | null; // last known error (if any)
  loading: boolean;
  movieRequestSet: Set<number> | null;
  movieRequests: MovieRequestApi[];
  movieProfiles: Profile[];
}

export interface CorePartialState {
  readonly [CORE_FEATURE_KEY]: State;
}

export const initialState: State = {
  loading: false,
  movieRequestSet: null,
  movieRequests: [],
  movieProfiles: [],
};

const coreReducer = createReducer(
  initialState,

  on(appInit, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),
  on(
    CoreActions.coreInitSuccess,
    (state, { movieProfiles, movieRequestSet, movieRequests }) => ({
      ...state,
      movieProfiles,
      movieRequestSet,
      movieRequests,
    })
  ),
  on(CoreActions.coreInitFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CoreActions.approveMovieRequestSuccess, (state, { id, approveDate }) => {
    const index = state.movieRequests.findIndex((mr) => mr.id === id);
    return {
      ...state,
      movieRequests: [
        ...state.movieRequests.slice(0, index),
        { ...state.movieRequests[index], approveDate },
        ...state.movieRequests.slice(index + 1, state.movieRequests.length),
      ],
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return coreReducer(state, action);
}
