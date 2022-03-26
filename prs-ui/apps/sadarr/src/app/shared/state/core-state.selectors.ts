import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CORE_FEATURE_KEY, State } from './core-state.reducer';

export const getCoreState = createFeatureSelector<State>(CORE_FEATURE_KEY);

export const geCoreLoading = createSelector(
  getCoreState,
  (state: State) => state.loading
);

export const getCoreError = createSelector(
  getCoreState,
  (state: State) => state.error
);

export const getMovieProfiles = createSelector(
  getCoreState,
  (state: State) => state.movieProfiles
);

export const getMovieRequestSet = createSelector(
  getCoreState,
  (state: State) => state.movieRequestSet
);

export const getUnapprovedMovieRequests = createSelector(
  getCoreState,
  (state: State) => state.movieRequests.filter((mr) => mr.approveDate == null)
);
