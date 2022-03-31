export interface Movie {
  hasFile: boolean;
  id: number;
  length: number;
  monitored: boolean;
  overview: string;
  profileId: number; // TODO - Ctrl shift f for profileId and change to qualityProfileId
  rating?: number;
  remotePoster: string;
  requested: boolean;
  status: string;
  studio: string;
  title: string;
  tmdbId: number;
  year: number;
}

export interface AddEvent {
  qualityProfileId: number;
  tmdbId: number;
}

export interface RequestEvent {
  movieDbid: number;
  name: string;
  qualityProfileId: number;
}
