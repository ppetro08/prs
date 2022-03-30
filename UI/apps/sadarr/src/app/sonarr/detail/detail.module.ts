import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { LozengeModule } from '../../shared/lozenge/lozenge.module';
import { DetailComponent } from './detail.component';
import { DetailViewComponent } from './view/detail-view.component';

@NgModule({
  imports: [
    CommonModule,
    LozengeModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
  ],
  exports: [DetailComponent],
  declarations: [DetailComponent, DetailViewComponent],
})
export class DetailModule {}
