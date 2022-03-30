import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import {
  UserManagementEditDialogData,
  UserManagementFormValue,
} from '../user-management';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'pip-user-management-edit-dialog',
  templateUrl: 'user-management-edit-dialog.component.html',
  styleUrls: ['user-management-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementEditDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<
      UserManagementEditDialogComponent,
      UserManagementFormValue
    >,
    @Inject(MAT_DIALOG_DATA) public data: UserManagementEditDialogData,
    private formBuilder: FormBuilder,
    private userManagementService: UserManagementService
  ) {
    const roles = data.user.userRoles.map((ur) => ur.role.name).join(', ');

    this.form = this.formBuilder.group({
      name: this.formBuilder.control(data.user.lastName),
      claims: this.formBuilder.control(roles),
      emailVerified: this.formBuilder.control(data.user.emailConfirmed),
    });
  }

  saveUser(form: FormGroup): void {
    const formValue: UserManagementFormValue = form.value;
    this.userManagementService
      .saveUser(formValue)
      .pipe(first())
      .subscribe(() => {
        this.dialogRef.close(formValue);
      });
  }
}
