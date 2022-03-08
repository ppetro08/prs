import { Action, createReducer, on } from '@ngrx/store';
import { ErrorModel } from '../../shared/models/error.model';
import { UserModel } from '../models/user.model';
import * as AuthenticationActions from './authentication.actions';

export const AUTHENTICATION_FEATURE_KEY = 'authentication';

export interface State {
  error: ErrorModel | null;
  isLoggedIn: boolean;
  loading: boolean;
  token: string | null;
  user: UserModel | null;
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
