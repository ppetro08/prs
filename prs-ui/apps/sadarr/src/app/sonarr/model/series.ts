import { SeriesStatus } from './series-api';

export interface Season {
  monitored: boolean;
  seasonNumber: number;
}

export interface Image {
  coverType: string;
  url: string;
}

export interface Series {
  added: boolean;
  id?: number;
  monitored: boolean;
  network?: string;
  overview: string;
  profileId: number;
  rating?: number;
  remotePoster?: string;
  seasonCount: number;
  seasons: Season[];
  status: SeriesStatus;
  title: string;
  tvdbId: number;
  year: number;
}

export interface AddEvent {
  all: boolean;
  id?: number;
  profileId: number;
  seasonIds: number[];
  tvdbId: number;
}
