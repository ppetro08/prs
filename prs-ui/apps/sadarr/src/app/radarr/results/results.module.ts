import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { LozengeModule } from '../../shared/lozenge/lozenge.module';
import { TimeModule } from '../../shared/pipes/time/time.module';
import { ProfileSelectModule } from '../../shared/profile-select/profile-select.module';
import { QualityModule } from '../pipes/quality.module';
import { ResultsContainerComponent } from './container/results-container.component';
import { ResultsItemComponent } from './item/results-item.component';

@NgModule({
  imports: [
    CommonModule,
    LozengeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    ProfileSelectModule,
    ReactiveFormsModule,
    ScrollingModule,
    TimeModule,
    QualityModule,
  ],
  exports: [ResultsContainerComponent, ResultsItemComponent],
  declarations: [ResultsContainerComponent, ResultsItemComponent],
})
export class ResultsModule {}
