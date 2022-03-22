import { UserModel } from '../../authentication/models/user.model';

export interface MovieRequest {
  id: number;
  movieDbid: number;
  createDate: Date;
  approveDate: Date;
  userId: string;
  user: UserModel;
}
