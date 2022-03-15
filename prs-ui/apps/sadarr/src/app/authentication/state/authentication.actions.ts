import { createAction, props } from '@ngrx/store';
import { ErrorModel } from '../../shared/models/error.model';
import { ConfirmRegistrationRequestModel } from '../models/confirm-registration.model';
import { LoginRequestModel } from '../models/login.model';
import { RegisterRequestModel } from '../models/register.model';
import { UserModel } from '../models/user.model';

export const authenticationUnverifiedSession = createAction(
  '[Authentication] Unverified Session'
);
export const authenticationVerifiedSessionSuccess = createAction(
  '[Authentication] Verified Session Success',
  props<{ user: UserModel }>()
);
export const authenticationVerifiedSessionFailure = createAction(
  '[Authentication] Verified Session Failure',
  props<{ error: string }>()
);

export const authenticationLogin = createAction(
  '[Authentication] Login',
  props<{ login: LoginRequestModel }>()
);
export const authenticationLoginSuccess = createAction(
  '[Authentication/API] Login Success',
  props<{ user: UserModel }>()
);
export const authenticationLoginFailure = createAction(
  '[Authentication/API] Login Failure',
  props<{ error: ErrorModel }>()
);

export const authenticationLogout = createAction('[Authentication] Logout');

export const authenticationRegister = createAction(
  '[Authentication] Register',
  props<{ register: RegisterRequestModel }>()
);
export const authenticationRegisterSuccess = createAction(
  '[Authentication/API] Register Success'
);
export const authenticationRegisterFailure = createAction(
  '[Authentication/API] Register Failure',
  props<{ error: ErrorModel }>()
);

export const authenticationConfirmRegistration = createAction(
  '[Authentication] Confirm Registration',
  props<{ confirmRegistrationRequest: ConfirmRegistrationRequestModel }>()
);
export const authenticationConfirmRegistrationSuccess = createAction(
  '[Authentication/API] Confirm Registration Success'
);
export const authenticationConfirmRegistrationFailure = createAction(
  '[Authentication/API] Confirm Registration Failure',
  props<{ error: ErrorModel }>()
);
