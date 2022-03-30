import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../../../authentication/models/user.model';
import { RoleService } from './role.service';

@Pipe({
  name: 'pipRole',
})
export class RolePipe implements PipeTransform {
  constructor(private roleService: RoleService) {}
  transform(value: UserModel): string {
    return this.roleService.commaSeparatedUserRoles(value);
  }
}
