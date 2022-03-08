import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { forkJoin } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SonarrApiService } from '../sonarr.api.service';
import * as SonarrActions from './sonarr.actions';

@Injectable()
export class SonarrEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SonarrActions.sonarrInit),
      fetch({
        run: (action) => {
          return forkJoin([
            this.sonarrApiService.loadAllSeries(),
            this.sonarrApiService.loadProfiles(),
            this.sonarrApiService.loadRootFolder(),
          ]).pipe(
            map(([series, profiles, rootFolders]) => {
              return SonarrActions.sonarrInitSuccess({
                entities: series,
                profiles,
                rootFolders,
              });
            }),
            take(1)
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SonarrActions.sonarrInitFailure({ error });
        },
      })
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SonarrActions.search),
      fetch({
        run: (action) => {
          return this.sonarrApiService.search(action.searchText).pipe(
            map((series) => {
              // TOOD:P - Sort by most recent or rating or something, add in full fledge sorting?
              return SonarrActions.searchSuccess({ series });
            }),

            take(1)
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SonarrActions.searchFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private sonarrApiService: SonarrApiService
  ) {}
}
