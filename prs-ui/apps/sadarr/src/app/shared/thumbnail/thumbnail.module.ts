import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QualityModule } from '../../radarr/pipes/quality.module';
import { ThumbnailComponent } from './thumbnail.component';

@NgModule({
  imports: [CommonModule, QualityModule, RouterModule],
  declarations: [ThumbnailComponent],
  exports: [ThumbnailComponent],
})
export class ThumbnailModule {}
