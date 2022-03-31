// TODO - remove this once sonarr is setup on api side
export interface RootFolderApi {
  accessible: boolean;
  id: number;
  freeSpace: number; // in bytes
  path: string;
}
