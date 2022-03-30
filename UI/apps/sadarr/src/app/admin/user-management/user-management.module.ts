import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { LoadingOverlayModule } from '../../shared/loading-overlay/loading-overlay.module';
import { RoleModule } from '../../shared/pipes/role/role.module';
import { UserManagementEditDialogComponent } from './user-management-edit-dialog/user-management-edit-dialog.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { UserManagementService } from './user-management.service';

@NgModule({
  declarations: [UserManagementComponent, UserManagementEditDialogComponent],
  imports: [
    UserManagementRoutingModule,
    CommonModule,
    FormsModule,
    LoadingOverlayModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    RoleModule,
  ],
  providers: [UserManagementService],
  exports: [UserManagementComponent],
})
export class UserManagementModule {}
