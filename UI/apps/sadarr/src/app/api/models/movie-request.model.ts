import { UserModel } from '../../authentication/models/user.model';

export interface MovieRequestApi {
  approveDate: Date | null;
  createDate: Date;
  id: number;
  movieDbid: number;
  name: string;
  qualityProfileId: number;
  userId: string;

  user: UserModel;
}

export interface MovieRequestAddApi {
  movieDbid: number;
  qualityProfileId: number;
}
