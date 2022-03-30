import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { forkJoin } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { MovieRequestsApiService } from '../../api/movie-requests.api.service';
import { appInit } from '../../app.actions';
import { getAuthenticationIsLoggedIn } from '../../authentication/state/authentication.selectors';
import { RadarrApiService } from '../api/radarr.api.service';
import * as CoreActions from './core-state.actions';

@Injectable()
export class CoreEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appInit),
      fetch({
        run: () => {
          return this.store.select(getAuthenticationIsLoggedIn).pipe(
            filter((i) => i),
            first(),
            switchMap(() => {
              return forkJoin([
                this.radarrApiService.loadProfiles(),
                this.movieRequestsApiService.getAllRequests(),
              ]).pipe(
                map(([movieProfiles, movieRequests]) => {
                  const movieRequestSet = new Set<number>(
                    movieRequests.map((mr) => mr.movieDbid)
                  );
                  return CoreActions.coreInitSuccess({
                    movieProfiles,
                    movieRequests,
                    movieRequestSet,
                  });
                })
              );
            })
          );
        },
        onError: (_action, error) => {
          return CoreActions.coreInitFailure({ error });
        },
      })
    )
  );

  approveMovieRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.approveMovieRequest),
      fetch({
        run: (action) => {
          return this.movieRequestsApiService
            .approveMovieRequest(action.id)
            .pipe(
              map((approveDate) => {
                return CoreActions.approveMovieRequestSuccess({
                  id: action.id,
                  approveDate,
                });
              })
            );
        },
        onError: (_action, error) => {
          return CoreActions.approveMovieRequestFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private radarrApiService: RadarrApiService,
    private movieRequestsApiService: MovieRequestsApiService,
    private store: Store
  ) {}
}
