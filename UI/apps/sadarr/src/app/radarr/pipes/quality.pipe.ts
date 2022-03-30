import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CorePartialState } from '../../shared/state/core-state.reducer';
import { getMovieProfiles } from '../../shared/state/core-state.selectors';

@Pipe({
  name: 'pipQuality',
})
export class QualityPipe implements PipeTransform {
  constructor(private store: Store<CorePartialState>) {}

  transform(value: number): Observable<string> {
    return this.store.select(getMovieProfiles).pipe(
      map((profiles) => {
        const profile = profiles.find((p) => p.id === value);
        if (profile) {
          return profile.name;
        }
        return value.toString();
      })
    );
  }
}
