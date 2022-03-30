import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoadingOverlayComponent } from './loading-overlay.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  declarations: [LoadingOverlayComponent],
  exports: [LoadingOverlayComponent],
})
export class LoadingOverlayModule {}
