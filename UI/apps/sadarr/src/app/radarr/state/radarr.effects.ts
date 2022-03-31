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
import * as CoreActions from '../../shared/state/core-state.actions';
import { containsCaseInsensitive } from '../../shared/utils/string-extensions';
import { MovieLookupApi } from '../models/radarr-api';
import * as RadarrActions from './radarr.actions';
import { searchSuccess } from './radarr.actions';
import { State } from './radarr.reducer';
import { getRadarrAllMovies, getRadarrState } from './radarr.selectors';

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
          const { tmdbId, qualityProfileId } = action.addMovie;
          const movieToAdd = state.searchResults.find(
            (sr) => sr.tmdbId === action.addMovie.tmdbId
          );

          if (!movieToAdd) {
            throw Error('Cannot find movie in search results.');
          }

          return this.movieRequestsApiService
            .addMovie(tmdbId, qualityProfileId)
            .pipe(
              map((movieLookupApi: MovieLookupApi) => {
                return RadarrActions.addMovieSuccess({
                  addedMovie: movieLookupApi,
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
        run: (_action) => {
          return forkJoin([this.radarrApiService.loadAllMovies()]).pipe(
            map(([movies]) => {
              return RadarrActions.radarrInitSuccess({
                entities: movies,
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
      ofType(CoreActions.requestMovie),
      withLatestFrom(this.store.select(getRadarrState)),
      pessimisticUpdate({
        run: (action, state: State) => {
          if (!state.searchResults) {
            throw Error('Cannot request movie without searching first.');
          }
          const movieToRequest = state.searchResults.find(
            (sr) => sr.tmdbId === action.requestMovie.movieDbid
          );

          if (!movieToRequest) {
            throw Error('Cannot find movie in search results.');
          }

          return this.movieRequestsApiService
            .addMovieRequest({
              movieDbid: action.requestMovie.movieDbid,
              name: action.requestMovie.name,
              qualityProfileId: action.requestMovie.qualityProfileId,
            })
            .pipe(
              map((movieRequest: MovieRequestApi) => {
                return CoreActions.requestMovieSuccess({
                  requestedMovie: { ...movieRequest },
                });
              })
            );
        },
        onError: (_action, error) => {
          console.error('Error', error);
          return CoreActions.requestMovieFailure({ error });
        },
      })
    )
  );

  requestMovieSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CoreActions.requestMovieSuccess),
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
        ofType(CoreActions.requestMovieFailure),
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
