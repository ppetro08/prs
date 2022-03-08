import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { Profile } from '../shared/profile-select/profile';
import { AddEvent, Series } from './model/series';
import { ResultsContainerComponent } from './results/container/results-container.component';
import { SonarrApiService } from './sonarr.api.service';
import { clearSearch, search, sonarrInit } from './state/sonarr.actions';
import { SonarrPartialState } from './state/sonarr.reducer';
import {
  getSonarrProfiles,
  getSonarrSearchLoading,
  getSonarrSearchResults,
  showNoResultsFound,
} from './state/sonarr.selectors';

@Component({
  selector: 'pip-sonarr',
  templateUrl: './sonarr.component.html',
  styleUrls: ['./sonarr.component.scss'],
  providers: [SonarrApiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SonarrComponent implements OnDestroy {
  @ViewChild(ResultsContainerComponent)
  resultsContainerComponent: ResultsContainerComponent | null = null;

  data$: Observable<Series[]>;

  profiles$: Observable<Profile[]>;

  searchLoading$: Observable<boolean | null>;

  showNoResultsFound$: Observable<boolean>;

  form: FormGroup;

  private destroyed$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private sonarrStore: Store<SonarrPartialState>
  ) {
    this.sonarrStore.dispatch(sonarrInit());
    this.data$ = this.sonarrStore
      .select(getSonarrSearchResults)
      .pipe(tap(() => this.changeDetectorRef.markForCheck()));
    this.searchLoading$ = this.sonarrStore.select(getSonarrSearchLoading);
    this.profiles$ = this.sonarrStore.select(getSonarrProfiles);
    this.showNoResultsFound$ = this.sonarrStore.select(showNoResultsFound);

    const searchControl: FormControl = this.formBuilder.control(null);
    this.form = this.formBuilder.group({
      search: searchControl,
    });
    searchControl.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroyed$))
      .subscribe((searchText: string) => {
        if (searchText !== '' && searchText !== null) {
          this.sonarrStore.dispatch(search({ searchText }));
        } else {
          this.sonarrStore.dispatch(clearSearch());
        }
        this.resultsContainerComponent?.scrollToTop();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  addClicked(item: AddEvent): void {
    // TODO:P - Update to dispatch action
    // this.sonarrApiService.addSeries(item);
  }
}
