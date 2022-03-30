import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { forkJoin } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { MovieRequestApi } from '../../api/models/movie-request.model';
import { MovieRequestsApiService } from '../../api/movie-requests.api.service';
import { RadarrApiService } from '../../shared/api/radarr.api.service';
import { containsCaseInsensitive } from '../../shared/utils/string-extensions';
import { AddMovieResponseApi } from '../models/radarr-api';
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
          this.snackBar.open('Movie added.', undefined, {
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
        run: (_action, movieRequestSet) => {
          return forkJoin([
            this.radarrApiService.loadAllMovies(),
            this.radarrApiService.loadRootFolder(),
          ]).pipe(
            map(([movies, rootFolders]) => {
              return RadarrActions.radarrInitSuccess({
                entities: movies,
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

  // Request Actions

  // TODO - Move request info to different reducer,
  // then will have to combine the two when search results comeback to check if item has already been requested to update buttons
  requestMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadarrActions.requestMovie),
      withLatestFrom(this.store.select(getRadarrState)),
      pessimisticUpdate({
        run: (action, state: State) => {
          if (!state.searchResults) {
            throw Error('Cannot request movie without searching first.');
          }
          const movieToRequest = state.searchResults.find(
            (sr) =>
              sr.id === action.requestMovie.id ||
              sr.tmdbId === action.requestMovie.tmdbId
          );

          if (!movieToRequest) {
            throw Error('Cannot find movie in search results.');
          }

          return this.movieRequestsApiService
            .addMovieRequest({
              movieDbid: action.requestMovie.tmdbId,
              qualityProfileId: action.requestMovie.profileId,
            })
            .pipe(
              map((movieRequest: MovieRequestApi) => {
                return RadarrActions.requestMovieSuccess({
                  requestedMovie: { ...movieRequest },
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

  requestMovieSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RadarrActions.requestMovieSuccess),
        tap(() => {
          this.snackBar.open('Movie requested.', undefined, {
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

  requestMovieFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RadarrActions.requestMovieFailure),
        tap(() => {
          this.snackBar.open('Failed to request movie.', undefined, {
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

  // End Request Actions

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
    private snackBar: MatSnackBar,
    private movieRequestsApiService: MovieRequestsApiService
  ) {}
}