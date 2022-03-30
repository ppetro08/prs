import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserModel } from '../../authentication/models/user.model';
import { UserManagementEditDialogComponent } from './user-management-edit-dialog/user-management-edit-dialog.component';
import { UserManagementService } from './user-management.service';

@Component({
  selector: 'pip-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementComponent implements OnDestroy {
  displayedColumns = ['displayName', 'roles', 'verified', 'edit'];

  loading = true;

  users: UserModel[] = [];

  private destroyed$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private userManagementService: UserManagementService
  ) {
    this.userManagementService
      .getUsers()
      .pipe(take(1))
      .subscribe((users) => {
        this.setUsers(users);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  editUser(user: UserModel): void {
    const dialogRef = this.dialog.open(UserManagementEditDialogComponent, {
      data: { user },
    });

    // TODO - Saving a user should update the state and that will trigger the selector to update the users instead of this slice shit

    dialogRef.afterClosed().subscribe((updatedUser: UserModel) => {
      // TODO on save instead of just closing?
      const index = this.users.findIndex((u) => u.id === updatedUser.id);

      const users = [
        ...this.users.slice(0, index),
        updatedUser,
        ...this.users.slice(index + 1, this.users.length),
      ];
      this.setUsers(users);
    });
  }

  private setUsers(users: UserModel[]): void {
    this.users = users;
    this.changeDetectorRef.markForCheck();
    this.loading = false;
  }
}
