import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrsApiService } from '../../shared/api/prs.api.service';
import { RadarrApiService } from '../../shared/api/radarr.api.service';
import { CorePartialState } from '../../shared/state/core-state.reducer';

@Injectable()
export class RequestManagementService {
  constructor(
    private prsApiService: PrsApiService,
    private radarrApiService: RadarrApiService,
    private store: Store<CorePartialState>
  ) {}
  approveMovieRequest(): void {}
}
