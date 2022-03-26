import { createAction, props } from '@ngrx/store';
import { MovieRequestApi } from '../../api/models/movie-request.model';
import { Profile } from '../profile-select/profile';

export const coreInitSuccess = createAction(
  '[Core/API] Core Init Success',
  props<{
    movieRequestSet: Set<number>;
    movieRequests: MovieRequestApi[];
    movieProfiles: Profile[];
  }>()
);
export const coreInitFailure = createAction(
  '[Core/API] Core init Failure',
  props<{ error: any }>()
);

export const approveMovieRequest = createAction(
  '[Core/API] Approve Movie Request',
  props<{ id: number }>()
);
export const approveMovieRequestSuccess = createAction(
  '[Core/API] Approve Movie Request Success',
  props<{ id: number; approveDate: Date }>()
);
export const approveMovieRequestFailure = createAction(
  '[Core/API] Approve Movie Request Failure',
  props<{ error: any }>()
);
