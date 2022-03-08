import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { forkJoin } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { containsCaseInsensitive } from '../../shared/utils/string-extensions';
import { AddMovieResponseApi } from '../models/radarr-api';
import { RadarrApiService } from '../radarr.api.service';
import * as RadarrActions from './radarr.actions';
import { searchSuccess } from './radarr.actions';
import { State } from './radarr.reducer';
import {
  getRadarrAllMovies,
  getRadarrDefaultFolderFromRootFolders,
  getRadarrState,
} from './radarr.selectors';

@Injectable()
export class RadarrEffects {
  addMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadarrActions.addMovie),
      withLatestFrom(this.store.select(getRadarrState)),
      pessimisticUpdate({
        run: (action, state: State) => {
          if (!state.searchResults) {
            throw Error('Cannot add movie without searching first.');
          }
          const movieToAdd = state.searchResults.find(
            (sr) =>
              sr.id === action.addMovie.id ||
              sr.tmdbId === action.addMovie.tmdbId
          );

          if (!movieToAdd) {
            throw Error('Cannot find movie in search results.');
          }

          const rootFolderPath: string | null =
            getRadarrDefaultFolderFromRootFolders(state.rootFolders);

          if (!rootFolderPath) {
            throw Error('Root folder unknown.');
          }

          return this.radarrApiService
            .addMovie({
              ...movieToAdd,
              addOptions: {
                searchForMovie: true,
              },
              monitored: true,
              qualityProfileId: action.addMovie.profileId,
              rootFolderPath,
            })
            .pipe(
              map((addMovieResponseApi: AddMovieResponseApi) => {
                return RadarrActions.addMovieSuccess({
                  addedMovie: { ...movieToAdd, ...addMovieResponseApi },
                });
              })
            );
        },
        onError: (_action, error) => {
          console.error('Error', error);
          return RadarrActions.addMovieFailure({ error });
        },
      })
    )
  );

  addMovieSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RadarrActions.addMovieSuccess),
        tap(() => {
          // Todo - Possibly add button to go to added movie detail page in snackbar
          this.snackBar.open('Added movie successfully.', undefined, {
            duration: 3000,
            panelClass: 'snackbar-success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        })
      );
    },
    { dispatch: false }
  );

  addMovieFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RadarrActions.addMovieFailure),
        tap(() => {
          this.snackBar.open('Failed to add movie.', undefined, {
            duration: 3000,
            panelClass: 'snackbar-failure',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        })
      );
    },
    { dispatch: false }
  );

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadarrActions.radarrInit),
      fetch({
        run: () => {
          return forkJoin([
            this.radarrApiService.loadAllMovies(),
            this.radarrApiService.loadProfiles(),
            this.radarrApiService.loadRootFolder(),
          ]).pipe(
            map(([movies, profiles, rootFolders]) => {
              return RadarrActions.radarrInitSuccess({
                entities: movies,
                profiles,
                rootFolders,
              });
            })
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return RadarrActions.radarrInitFailure({ error });
        },
      })
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadarrActions.search),
      fetch({
        run: (action) => {
          return this.radarrApiService.search(action.searchText).pipe(
            map((movies) => {
              // TOOD:P - Sort by most recent or rating or something, add in full fledge sorting?
              return RadarrActions.searchSuccess({ movies: movies });
            })
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return RadarrActions.searchFailure({ error });
        },
      })
    )
  );

  searchExistingMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadarrActions.searchExistingMovies),
      withLatestFrom(this.store.select(getRadarrAllMovies)),
      map(([action, movies]) => {
        const filteredMovies = movies.filter((m) =>
          containsCaseInsensitive(m.title, action.searchText)
        );

        return searchSuccess({ movies: filteredMovies });
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private radarrApiService: RadarrApiService,
    private store: Store<State>,
    private snackBar: MatSnackBar
  ) {}
}
