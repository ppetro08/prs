export interface Movie {
  hasFile: boolean;
  id: number;
  length: number;
  monitored: boolean;
  overview: string;
  profileId: number;
  rating?: number;
  remotePoster: string;
  status: string;
  studio: string;
  title: string;
  tmdbId: number;
  year: number;
}

export interface AddEvent {
  id?: number;
  profileId: number;
  tmdbId: number;
}

export interface RequestEvent {
  id?: number;
  profileId: number;
  tmdbId: number;
}
