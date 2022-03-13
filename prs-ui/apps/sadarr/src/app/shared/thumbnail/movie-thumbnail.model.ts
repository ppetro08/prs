import {
  getRemotePoster,
  MovieLookupApi,
} from '../../radarr/models/radarr-api';

export interface MovieThumbnail {
  hasFile: boolean;
  id: number;
  monitored: boolean;
  profileId: number;
  remotePoster: string;
  title: string;
}

export function convertMovieLookupApiToThumbnail(
  movieLookupApi: MovieLookupApi
): MovieThumbnail {
  return {
    hasFile: movieLookupApi.hasFile,
    id: movieLookupApi.id,
    monitored: movieLookupApi.monitored,
    profileId: movieLookupApi.qualityProfileId,
    remotePoster: getRemotePoster(movieLookupApi),
    title: movieLookupApi.title,
  };
}
