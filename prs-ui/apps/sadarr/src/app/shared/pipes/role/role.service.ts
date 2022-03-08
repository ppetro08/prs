import { Injectable } from '@angular/core';
import { UserModel } from '../../../authentication/models/user.model';

@Injectable()
export class RoleService {
  commaSeparatedUserRoles(user: UserModel): string {
    return user.userRoles.map((ur) => ur.role.name).join(', ');
  }
}
