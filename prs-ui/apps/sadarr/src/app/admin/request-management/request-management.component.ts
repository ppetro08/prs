import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MovieRequestApi } from '../../api/models/movie-request.model';
import { UserModel } from '../../authentication/models/user.model';
import { RadarrPartialState } from '../../radarr/state/radarr.reducer';
import { approveMovieRequest } from '../../shared/state/core-state.actions';
import { getUnapprovedMovieRequests } from '../../shared/state/core-state.selectors';

const user: Partial<UserModel> = {
  firstName: 'Philip',
  lastName: 'Petrosino',
};

const movieRequest: Partial<MovieRequestApi> = {
  movieDbid: 1234,
  qualityProfileId: 6,
  createDate: new Date(),
  user: user as UserModel,
};

// TODO - Need movieRequests and qualityProfile moved to a shared store that can be used in multiple modules?

@Component({
  selector: 'prs-request-management',
  templateUrl: './request-management.component.html',
  styleUrls: ['./request-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestManagementComponent implements OnDestroy {
  displayedColumns = [
    'userName',
    'movieName',
    'quality',
    'requestDate',
    'approve',
  ];

  loading = false;

  movieRequests: MovieRequestApi[] = [movieRequest as MovieRequestApi];

  private destroyed$ = new Subject<void>();

  constructor(
    private store: Store<RadarrPartialState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.store
      .select(getUnapprovedMovieRequests)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((movieRequests) => {
        this.movieRequests = movieRequests;
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  approveMovieRequest(movieRequest: MovieRequestApi): void {
    this.store.dispatch(approveMovieRequest({ id: movieRequest.id }));
  }
}
