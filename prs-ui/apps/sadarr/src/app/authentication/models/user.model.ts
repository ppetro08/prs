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
  name: string;
}
