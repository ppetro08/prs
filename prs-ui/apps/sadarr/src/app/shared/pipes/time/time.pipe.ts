import { Pipe, PipeTransform } from '@angular/core';
import { TimeService } from './time.service';

@Pipe({
  name: 'pipTime',
})
export class TimePipe implements PipeTransform {
  constructor(private timeService: TimeService) {}
  transform(value: number): string {
    return this.timeService.minutesToHoursMinutes(value);
  }
}
