import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { UsersRoles } from '../../authentication/models/user.model';
import { getAuthenticationUsersRoles } from '../../authentication/state/authentication.selectors';
import { Profile } from '../../shared/profile-select/profile';
import { AddEvent, Movie, RequestEvent } from '../models/radarr';
import { ResultsContainerComponent } from '../results/container/results-container.component';
import {
  addMovie,
  clearSearch,
  radarrInit,
  requestMovie,
  search,
} from '../state/radarr.actions';
import {
  convertRadarrApiToRadarr,
  getRadarrProfiles,
  getRadarrSearchLoading,
  getRadarrSearchResults,
  showNoResultsFound,
} from '../state/radarr.selectors';

@Component({
  selector: 'pip-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMovieComponent implements OnDestroy {
  @ViewChild(ResultsContainerComponent)
  resultsContainerComponent: ResultsContainerComponent | null = null;

  data$: Observable<Movie[]>;

  profiles$: Observable<Profile[]>;

  searchLoading$: Observable<boolean | null>;

  showNoResultsFound$: Observable<boolean>;

  usersRoles$: Observable<UsersRoles | null>;

  form: FormGroup;

  private destroyed$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.store.dispatch(radarrInit());
    this.data$ = this.store
      .select(getRadarrSearchResults)
      .pipe(
        map((sr) => sr.map((movieApi) => convertRadarrApiToRadarr(movieApi)))
      );
    this.searchLoading$ = this.store.select(getRadarrSearchLoading);
    this.profiles$ = this.store.select(getRadarrProfiles);
    this.showNoResultsFound$ = this.store.select(showNoResultsFound);
    this.usersRoles$ = this.store.select(getAuthenticationUsersRoles);

    const searchControl: FormControl = this.formBuilder.control(null);
    this.form = this.formBuilder.group({
      search: searchControl,
    });
    searchControl.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroyed$))
      .subscribe((searchText: string) => {
        if (searchText !== '' && searchText !== null) {
          this.store.dispatch(search({ searchText }));
        } else {
          this.store.dispatch(clearSearch());
        }
        this.resultsContainerComponent?.scrollToTop();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  addClicked(item: AddEvent): void {
    this.store.dispatch(addMovie({ addMovie: item }));
  }

  requestClicked(item: RequestEvent): void {
    this.store.dispatch(requestMovie({ requestMovie: item }));
  }
}
