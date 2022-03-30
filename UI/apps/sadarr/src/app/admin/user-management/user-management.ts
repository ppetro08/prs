import { UserModel } from '../../authentication/models/user.model';

export interface UserManagementFormValue {
  name: string;
  roles: string;
  emailVerified: boolean;
}

export interface UserManagementEditDialogData {
  user: UserModel;
}
