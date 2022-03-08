import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimePipe } from './time.pipe';
import { TimeService } from './time.service';

@NgModule({
  imports: [CommonModule],
  declarations: [TimePipe],
  exports: [TimePipe],
  providers: [TimeService],
})
export class TimeModule {}
