import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserModel } from '../../authentication/models/user.model';
import { PrsApiService } from '../../shared/api/prs.api.service';
import { UserManagementFormValue } from './user-management';

@Injectable()
export class UserManagementService {
  constructor(private prsApiService: PrsApiService) {}
  getUsers(): Observable<UserModel[]> {
    return this.prsApiService.get<UserModel[]>('User');
  }
  saveUser(adminFormValue: UserManagementFormValue): Observable<void> {
    // TODO - Implement me
    return of();
  }
}
