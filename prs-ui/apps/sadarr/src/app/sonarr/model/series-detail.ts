import { SeriesStatus } from './series-api';

export interface SeriesDetail {
  id?: number;
  monitored: boolean;
  network?: string;
  overview: string;
  profile: string;
  rating?: number;
  remotePoster?: string;
  seasons: SeriesDetailSeason[]; // different model
  status: SeriesStatus;
  title: string;
  yearSpan: string;
}

export interface SeriesDetailSeason {
  episodes: SeriesDetailEpisode[];
  expanded: boolean;
  monitored: boolean;
  seasonNumber: number;
}

export interface SeriesDetailEpisode {
  monitored: boolean;
  episodeNumber: number;
  title: string;
  airDate: Date;
  status: string;
}
