import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserModel } from '../authentication/models/user.model';
import { PrsApiService } from '../shared/api/prs.api.service';
import { AdminFormValue } from './models/admin';

@Injectable()
export class AdminService {
  constructor(private prsApiService: PrsApiService) {}
  getUsers(): Observable<UserModel[]> {
    // TODO - Implement me
    return this.prsApiService.get<UserModel[]>('User');
  }
  saveUser(adminFormValue: AdminFormValue): Observable<void> {
    return of();
  }
}
