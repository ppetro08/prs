import { TimeService } from './time.service';

describe('Time', () => {
  const timeService = new TimeService();
  it('less than an hour', () => {
    expect(timeService.minutesToHoursMinutes(47)).toEqual('47m');
  });
  it('more than an hour', () => {
    expect(timeService.minutesToHoursMinutes(99)).toEqual('1h 39m');
  });
  it('more than 2 hours', () => {
    expect(timeService.minutesToHoursMinutes(200)).toEqual('3h 20m');
  });
});
