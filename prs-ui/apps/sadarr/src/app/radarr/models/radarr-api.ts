export interface MovieLookupApi {
  added: Date;
  addOptions: AddMovieOptions;
  alternateTitles: AlternateTitleApi;
  certification: string;
  cleanTitle: string;
  collection: CollectionApi;
  folder: string;
  folderName: string;
  genres: string[];
  hasFile: boolean;
  id: number;
  images: ImageApi[];
  imdbId: string;
  inCinemas: Date;
  isAvailable: boolean;
  minimumAvailability: MovieStatusApi;
  monitored: boolean;
  originalTitle: string;
  overview: string;
  path?: string;
  physicalRelease: Date;
  qualityProfileId: number;
  ratings: RatingsApi;
  remotePoster: string;
  rootFolderPath: string;
  runtime: number;
  secondaryYearSourceId: number;
  sizeOnDisk: number;
  sortTitle: string;
  status: MovieStatusApi;
  studio: string;
  tags: string[];
  title: string;
  titleSlug: string;
  tmdbId: number;
  website: string;
  year: number;
  youtubeTrailerId: string;
}

export interface AddMovieOptions {
  searchForMovie: boolean;
}

export interface AddMovieResponseApi {
  added: Date;
  folderName: string;
  genres: string[];
  id: number;
  path: string;
}

export interface AlternateTitleApi {
  movieId: number;
  sourceId: number;
  sourceType: string;
  title: string;
  voteCount: number;
  votes: number;
  language: {
    id: number;
    name: string;
  };
}

export interface CollectionApi {
  name: string;
  tmdbid: number;
  images: ImageApi[];
}

export interface ImageApi {
  coverType: string;
  remoteUrl: string;
  url: string;
}

export type MovieStatusApi =
  | 'deleted'
  | 'tba'
  | 'announced'
  | 'incinemas'
  | 'released'
  | 'predb';

export interface RatingsApi {
  value: number;
  votes: number;
}
