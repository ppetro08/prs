import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Series } from '../model/series';
import { SeasonApi, SeriesApi } from '../model/series-api';
import { SonarrEntity } from './sonarr.models';
import { sonarrAdapter, SONARR_FEATURE_KEY, State } from './sonarr.reducer';

export const getSonarrState = createFeatureSelector<State>(SONARR_FEATURE_KEY);

const { selectAll, selectEntities } = sonarrAdapter.getSelectors();

export const getSonarrLoading = createSelector(
  getSonarrState,
  (state: State) => state.loading
);

export const getSonarrError = createSelector(
  getSonarrState,
  (state: State) => state.error
);

export const getSonarrAllSeries = createSelector(
  getSonarrState,
  (state: State) => selectAll(state)
);

export const getSonarrSeriesDictionary = createSelector(
  getSonarrState,
  (state: State) => selectEntities(state)
);

export const getSonarrSeries = (seriesId: number) =>
  createSelector(
    getSonarrSeriesDictionary,
    (seriesDictionary: Dictionary<SonarrEntity>) => seriesDictionary[seriesId]
  );

export const getSonarrRootFolders = createSelector(
  getSonarrState,
  (state: State) => state.rootFolders
);

export const getSonarrDefaultRootFolderPath = createSelector(
  getSonarrRootFolders,
  (rootFolders) => (rootFolders ? rootFolders[0].path : null)
);

export const getSonarrProfiles = createSelector(
  getSonarrState,
  (state: State) => state.profiles
);

export const getSonarrSearchResults = createSelector(
  getSonarrState,
  (state: State) =>
    state.searchResults
      ? state.searchResults.map((sa) => convertSeriesApiToSeries(sa))
      : []
);

export const showNoResultsFound = createSelector(
  getSonarrState,
  (state: State) =>
    state.searchLoading === false &&
    state.searchResults.length === 0 &&
    state.searchText !== null &&
    state.searchText !== ''
);

export const getSonarrSearchLoading = createSelector(
  getSonarrState,
  (state: State) => state.searchLoading
);

function convertSeriesApiToSeries(seriesApi: SeriesApi): Series {
  return {
    added: new Date(seriesApi.added).getTime() > 0,
    id: seriesApi.id,
    monitored: seriesApi.monitored,
    network: seriesApi.network,
    overview: seriesApi.overview,
    profileId: seriesApi.qualityProfileId,
    rating: seriesApi.ratings ? seriesApi.ratings.value * 10 : undefined,
    remotePoster: seriesApi.remotePoster
      ? seriesApi.remotePoster
      : seriesApi.images.length > 0
      ? seriesApi.images[0].url
      : undefined,
    seasonCount: seriesApi.seasonCount,
    seasons: seriesApi.seasons.filter((s: SeasonApi) => s.seasonNumber > 0),
    status: seriesApi.status,
    title: seriesApi.title,
    tvdbId: seriesApi.tvdbId,
    year: seriesApi.year,
  };
}

// function convertAddEventToAddEventApi(
//   addEvent: AddEvent,
//   rootFolder: string
// ): AddSeriesApi {
//   if (rootFolder === null) {
//     throw Error('Somehow rootFolder is null');
//   }

//   let seasons: SeasonApi[] = [];
//   if (addEvent.all) {
//     // TODO:P - Go find all seasons from the store and send it
//   } else if (addEvent.seasonIds.length > 0) {
//     seasons = addEvent.seasonIds.map((s: number) => {
//       return {
//         monitored: true,
//         seasonNumber: s,
//       };
//     });
//   } else {
//     throw Error('Seasons must be supplied');
//   }

//   // TODO:P - If there is already a series with the same folder name add year to folder as well?
//   return {
//     addOptions: {
//       monitor: 'None',
//       searchForMissingEpisodes: false, // TODO:P - These need to be thought about more
//       searchForCutoffUnmetEpisodes: false, // TODO:P - These need to be thought about more
//     },
//     profileId: addEvent.profileId,
//     rootFolderPath: rootFolder,
//     seasons,
//     tvdbId: addEvent.tvdbId,
//   };
// }
