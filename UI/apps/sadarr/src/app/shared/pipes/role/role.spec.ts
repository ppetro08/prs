import { UserModel } from '../../../authentication/models/user.model';
import { RoleService } from './role.service';

describe('Role', () => {
  const roleService = new RoleService();
  it('is only Movie_Request', () => {
    const user = {
      userRoles: [
        {
          role: {
            name: 'Movie_Request',
          },
        },
      ],
    } as UserModel;
    expect(roleService.commaSeparatedUserRoles(user)).toEqual('Movie_Request');
  });
  it('is Movie_Request and TvShow_Request', () => {
    const user = {
      userRoles: [
        {
          role: {
            name: 'Movie_Request',
          },
        },
        {
          role: {
            name: 'TvShow_Request',
          },
        },
      ],
    } as UserModel;

    expect(roleService.commaSeparatedUserRoles(user)).toEqual(
      'Movie_Request, TvShow_Request'
    );
  });
});
