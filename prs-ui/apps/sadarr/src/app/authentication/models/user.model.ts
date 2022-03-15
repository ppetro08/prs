export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: boolean;
  token: string;
  userRoles: UserRoleModel[];
}

export interface UserRoleModel {
  userId: string;
  roleId: string;
  role: RoleModel;
}

export interface RoleModel {
  id: string;
  name: Roles;
}

export interface UsersRoles {
  admin: boolean;
  canAddMovies: boolean;
  canAddTvShows: boolean;
  canRequestMovies: boolean;
  canRequestTvShows: boolean;
}

export type Roles =
  | 'Admin'
  | 'Movie_Add'
  | 'Movie_Request'
  | 'TvShow_Add'
  | 'TvShow_Request';
