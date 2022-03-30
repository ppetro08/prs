import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootFolderApi } from '../../shared/models/root-folder-api';
import { getMovieRequestSet } from '../../shared/state/core-state.selectors';
import { capitalizeFirstLetter } from '../../shared/utils/string-extensions';
import { Movie } from '../models/radarr';
import { MovieLookupApi, MovieStatusApi } from '../models/radarr-api';
import { radarrAdapter, RADARR_FEATURE_KEY, State } from './radarr.reducer';

export const getRadarrState = createFeatureSelector<State>(RADARR_FEATURE_KEY);

const { selectAll, selectEntities } = radarrAdapter.getSelectors();

export const getRadarrLoading = createSelector(
  getRadarrState,
  (state: State) => state.loading
);

export const getRadarrError = createSelector(
  getRadarrState,
  (state: State) => state.error
);

export const getRadarrAllMovies = createSelector(
  getRadarrState,
  (state: State) => selectAll(state)
);

export const getRadarrMoviesDictionary = createSelector(
  getRadarrState,
  (state: State) => selectEntities(state)
);

export const getRadarrMovies = (seriesId: number) =>
  createSelector(
    getRadarrMoviesDictionary,
    (seriesDictionary: Dictionary<MovieLookupApi>) => seriesDictionary[seriesId]
  );

export const getRadarrRootFolders = createSelector(
  getRadarrState,
  (state: State) => state.rootFolders
);

export function getRadarrDefaultFolderFromRootFolders(
  rootFolders: RootFolderApi[]
): string | null {
  return rootFolders ? rootFolders[0].path : null;
}
export const getRadarrDefaultRootFolderPath = createSelector(
  getRadarrRootFolders,
  (rootFolders) => getRadarrDefaultFolderFromRootFolders(rootFolders)
);

export const getRadarrSearchResults = createSelector(
  getRadarrState,
  getMovieRequestSet,
  (state: State, movieRequestSet: Set<number> | null) => {
    return state.searchResults.map((sr) =>
      convertRadarrApiToRadarr(sr, movieRequestSet)
    );
  }
);

export const showNoResultsFound = createSelector(
  getRadarrState,
  (state: State) =>
    state.searchLoading === false &&
    state.searchResults.length === 0 &&
    state.searchText !== null &&
    state.searchText !== ''
);

export const getRadarrSearchLoading = createSelector(
  getRadarrState,
  (state: State) => state.searchLoading
);

function convertStatusStringToReadable(status: MovieStatusApi): string {
  if (status === 'incinemas') {
    return 'In Cinemas';
  } else if (status === 'predb') {
    return '';
  }

  return capitalizeFirstLetter(status);
}

export function convertRadarrApiToRadarr(
  radarrApi: MovieLookupApi,
  movieRequestSet: Set<number> | null
): Movie {
  return {
    id: radarrApi.id,
    monitored: radarrApi.monitored,
    studio: radarrApi.studio,
    overview: radarrApi.overview,
    profileId: radarrApi.qualityProfileId,
    rating: radarrApi.ratings ? radarrApi.ratings.value * 10 : undefined,
    remotePoster: radarrApi.remotePoster
      ? radarrApi.remotePoster
      : radarrApi?.images[0]?.remoteUrl,
    requested: movieRequestSet?.has(radarrApi.tmdbId) ?? false,
    status: convertStatusStringToReadable(radarrApi.status),
    title: radarrApi.title,
    tmdbId: radarrApi.tmdbId,
    hasFile: radarrApi.hasFile,
    length: radarrApi.runtime,
    year: radarrApi.year,
  };
}
