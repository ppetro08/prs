import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RadarrPartialState } from '../state/radarr.reducer';
import { getRadarrProfiles } from '../state/radarr.selectors';

@Pipe({
  name: 'pipQuality',
})
export class QualityPipe implements PipeTransform {
  constructor(private store: Store<RadarrPartialState>) {}

  transform(value: number): Observable<string> {
    return this.store.select(getRadarrProfiles).pipe(
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
