import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTHENTICATION_FEATURE_KEY, State } from './authentication.reducer';

export const getAuthenticationState = createFeatureSelector<State>(
  AUTHENTICATION_FEATURE_KEY
);

export const getUserToken = createSelector(
  getAuthenticationState,
  (state: State) => state.token
);

export const getUser = createSelector(
  getAuthenticationState,
  (state: State) => state.user
);

export const getAuthenticationLoading = createSelector(
  getAuthenticationState,
  (state: State) => state.loading
);

export const getAuthenticationError = createSelector(
  getAuthenticationState,
  (state: State) => state.error
);

export const getAuthenticationIsAdmin = createSelector(
  getAuthenticationState,
  (state: State) => {
    const index = state.user?.userRoles?.findIndex(
      (ur) => ur.role.name === 'Admin'
    );
    return index === undefined ? false : index > -1;
  }
);

export const getAuthenticationIsLoggedIn = createSelector(
  getAuthenticationState,
  (state: State) => state.isLoggedIn
);
