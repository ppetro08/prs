import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { QualityModule } from '../../radarr/pipes/quality.module';
import { LoadingOverlayModule } from '../../shared/loading-overlay/loading-overlay.module';
import { RequestManagementRoutingModule } from './request-management-routing.module';
import { RequestManagementComponent } from './request-management.component';

@NgModule({
  declarations: [RequestManagementComponent],
  imports: [
    RequestManagementRoutingModule,
    CommonModule,
    LoadingOverlayModule,
    MatButtonModule,
    MatTableModule,
    QualityModule,
  ],
  exports: [RequestManagementComponent],
})
export class RequestManagementModule {}
