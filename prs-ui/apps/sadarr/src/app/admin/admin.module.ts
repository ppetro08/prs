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
import { LoadingOverlayModule } from '../shared/loading-overlay/loading-overlay.module';
import { RoleModule } from '../shared/pipes/role/role.module';
import { AdminEditDialogComponent } from './admin-edit-dialog/admin-edit-dialog.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';

@NgModule({
  declarations: [AdminComponent, AdminEditDialogComponent],
  imports: [
    AdminRoutingModule,
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
  providers: [AdminService],
  exports: [AdminComponent],
})
export class AdminModule {}
