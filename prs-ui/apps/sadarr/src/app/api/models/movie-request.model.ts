import { UserModel } from '../../authentication/models/user.model';

export interface MovieRequest {
  approveDate: Date;
  createDate: Date;
  id: number;
  movieDbid: number;
  qualityProfileId: number;
  userId: string;

  user: UserModel;
}

export interface MovieRequestAdd {
  movieDbid: number;
  qualityProfileId: number;
}
