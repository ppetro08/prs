import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { AdminEditDialogData, AdminFormValue } from '../models/admin';

@Component({
  selector: 'pip-admin-edit-dialog',
  templateUrl: 'admin-edit-dialog.component.html',
  styleUrls: ['admin-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminEditDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AdminEditDialogComponent, AdminFormValue>,
    @Inject(MAT_DIALOG_DATA) public data: AdminEditDialogData,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {
    const roles = data.user.userRoles.map((ur) => ur.role.name).join(', ');

    this.form = this.formBuilder.group({
      name: this.formBuilder.control(data.user.lastName),
      claims: this.formBuilder.control(roles),
      emailVerified: this.formBuilder.control(data.user.emailConfirmed),
    });
  }

  saveUser(form: FormGroup): void {
    const formValue: AdminFormValue = form.value;
    this.adminService
      .saveUser(formValue)
      .pipe(first())
      .subscribe(() => {
        this.dialogRef.close(formValue);
      });
  }
}
