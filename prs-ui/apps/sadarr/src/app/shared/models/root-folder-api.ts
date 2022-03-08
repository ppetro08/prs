export interface RootFolderApi {
  accessible: boolean;
  id: number;
  freeSpace: number; // in bytes
  path: string;
}
