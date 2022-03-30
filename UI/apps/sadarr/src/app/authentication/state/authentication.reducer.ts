import { Action, createReducer, on } from '@ngrx/store';
import { ErrorModel } from '../../shared/models/error.model';
import { UserModel, UsersRoles } from '../models/user.model';
import * as AuthenticationActions from './authentication.actions';

export const AUTHENTICATION_FEATURE_KEY = 'authentication';

export interface State {
  error: ErrorModel | null;
  isLoggedIn: boolean;
  loading: boolean;
  token: string | null;
  user: UserModel | null;
  usersRoles: UsersRoles | null;
}

export interface AuthenticationPartialState {
  readonly [AUTHENTICATION_FEATURE_KEY]: State;
}

export const initialState: State = {
  error: null,
  isLoggedIn: false,
  loading: true,
  token: null,
  user: null,
  usersRoles: null,
};

const authenticationReducer = createReducer(
  initialState,
  on(AuthenticationActions.authenticationLogin, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),
  on(
    AuthenticationActions.authenticationVerifiedSessionSuccess,
    AuthenticationActions.authenticationLoginSuccess,
    (state, action) => {
      return {
        ...state,
        error: null,
        isLoggedIn: true,
        loading: false,
        user: action.user,
        usersRoles: getUserRoles(action.user),
      };
    }
  ),
  on(
    AuthenticationActions.authenticationLoginFailure,
    AuthenticationActions.authenticationRegisterFailure,
    AuthenticationActions.authenticationConfirmRegistrationFailure,
    (state, { error }) => ({
      ...state,
      error,
      isLoggedIn: false,
      loading: false,
    })
  ),
  on(AuthenticationActions.authenticationVerifiedSessionFailure, (state) => ({
    ...state,
    isLoggedIn: false,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authenticationReducer(state, action);
}

function getUserRoles(user: UserModel): UsersRoles {
  const usersRoles: UsersRoles = {
    admin: false,
    canAddMovies: false,
    canAddTvShows: false,
    canRequestMovies: false,
    canRequestTvShows: false,
  };

  user.userRoles.forEach((ur) => {
    switch (ur.role.name) {
      case 'Admin':
        usersRoles.admin = true;
        usersRoles.canAddMovies = true;
        usersRoles.canAddTvShows = true;
        break;
      case 'Movie_Add':
        usersRoles.canAddMovies = true;
        break;
      case 'TvShow_Add':
        usersRoles.canAddTvShows = true;
        break;
      case 'Movie_Request':
        usersRoles.canRequestMovies = true;
        break;
      case 'TvShow_Request':
        usersRoles.canRequestTvShows = true;
        break;
    }
  });

  return usersRoles;
}
