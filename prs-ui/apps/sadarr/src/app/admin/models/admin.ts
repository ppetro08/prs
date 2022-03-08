import { UserModel } from '../../authentication/models/user.model';

export interface AdminFormValue {
  name: string;
  roles: string;
  emailVerified: boolean;
}

export interface AdminEditDialogData {
  user: UserModel;
}
