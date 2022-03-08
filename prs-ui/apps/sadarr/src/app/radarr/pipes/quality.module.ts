import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QualityPipe } from './quality.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [QualityPipe],
  exports: [QualityPipe],
})
export class QualityModule {}
