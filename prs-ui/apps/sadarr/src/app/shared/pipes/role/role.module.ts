import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RolePipe } from './role.pipe';
import { RoleService } from './role.service';

@NgModule({
  imports: [CommonModule],
  declarations: [RolePipe],
  exports: [RolePipe],
  providers: [RoleService],
})
export class RoleModule {}
