import { UserRoleModel } from './user.model';

export interface LoginRequestModel {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponseModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  userRoles: UserRoleModel[];
}
