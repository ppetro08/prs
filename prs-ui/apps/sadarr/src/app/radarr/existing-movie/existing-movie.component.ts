import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { Subject } from 'rxjs';
import { debounceTime, first, takeUntil } from 'rxjs/operators';
import { containsCaseInsensitive } from '../../shared/utils/string-extensions';
import { AddEvent, Movie } from '../models/radarr';
import { addMovie, radarrInit } from '../state/radarr.actions';
import { RadarrPartialState } from '../state/radarr.reducer';
import {
  convertRadarrApiToRadarr,
  getRadarrAllMovies,
} from '../state/radarr.selectors';

@Component({
  selector: 'pip-existing-movie',
  templateUrl: './existing-movie.component.html',
  styleUrls: ['./existing-movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExistingMovieComponent implements OnDestroy {
  @ViewChild(VirtualScrollerComponent)
  virtualScroller: VirtualScrollerComponent;

  filteredMovies: Movie[];

  form: FormGroup;

  imgWidth: number;

  private destroyed$ = new Subject<void>();

  private movies: Movie[];

  constructor(
    private formBuilder: FormBuilder,
    private radarrStore: Store<RadarrPartialState>,
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {
    this.radarrStore.dispatch(radarrInit());
    this.radarrStore
      .select(getRadarrAllMovies)
      .pipe(first((m) => m.length > 0))
      .subscribe((movies) => {
        this.movies = movies.map((movieApi) =>
          convertRadarrApiToRadarr(movieApi)
        );
        this.filteredMovies = [...this.movies];
        this.changeDetectorRef.markForCheck();
        // TODO - 17 offset is for scrollbar, if I use a custom scrollbar this will need to be changed
        this.resizeImages(17);
      });

    const searchControl: FormControl = this.formBuilder.control(null);
    this.form = this.formBuilder.group({
      search: searchControl,
    });
    searchControl.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroyed$))
      .subscribe((searchText: string) => {
        if (searchText !== '' && searchText !== null) {
          this.filteredMovies = this.movies.filter((m) =>
            containsCaseInsensitive(m.title, searchText)
          );
        } else {
          this.filteredMovies = [...this.movies];
        }
        this.changeDetectorRef.markForCheck();
        this.virtualScroller.scrollToPosition(0);
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeImages();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  addClicked(item: AddEvent): void {
    this.radarrStore.dispatch(addMovie({ addMovie: item }));
  }

  resizeImages(offset: number = 0): void {
    var imgWidth = 140;
    var thumbnailMargin = 16;
    var fullWidth = imgWidth + thumbnailMargin;
    var el: HTMLElement =
      this.elementRef.nativeElement.querySelector('.existing-movies');

    var containerWidth = Math.floor(el.offsetWidth) - offset;
    var diff = containerWidth / fullWidth;

    var maxWholeImages = Math.floor(diff);
    var imagesSpace = containerWidth - maxWholeImages * fullWidth;
    var widthIncrease = Math.floor(imagesSpace / maxWholeImages);

    var width = imgWidth + widthIncrease - 1;
    this.imgWidth = width;
    this.changeDetectorRef.markForCheck();
  }
}
