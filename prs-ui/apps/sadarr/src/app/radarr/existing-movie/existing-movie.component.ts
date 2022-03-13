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
import {
  convertMovieLookupApiToThumbnail,
  MovieThumbnail,
} from '../../shared/thumbnail/movie-thumbnail.model';
import { containsCaseInsensitive } from '../../shared/utils/string-extensions';
import { AddEvent } from '../models/radarr';
import { addMovie, radarrInit } from '../state/radarr.actions';
import { RadarrPartialState } from '../state/radarr.reducer';
import { getRadarrAllMovies } from '../state/radarr.selectors';

@Component({
  selector: 'pip-existing-movie',
  templateUrl: './existing-movie.component.html',
  styleUrls: ['./existing-movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExistingMovieComponent implements OnDestroy {
  @ViewChild(VirtualScrollerComponent)
  virtualScroller: VirtualScrollerComponent;

  filteredMovieThumbnails: MovieThumbnail[];

  form: FormGroup;

  imgWidth: number;

  private destroyed$ = new Subject<void>();

  private resizeImagesSubject = new Subject<void>();

  private thumbnails: MovieThumbnail[];

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
        this.thumbnails = movies.map((movieApi) =>
          convertMovieLookupApiToThumbnail(movieApi)
        );
        this.filteredMovieThumbnails = [...this.thumbnails];
        this.changeDetectorRef.markForCheck();
      });

    const searchControl: FormControl = this.formBuilder.control(null);
    this.form = this.formBuilder.group({
      search: searchControl,
    });
    searchControl.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroyed$))
      .subscribe((searchText: string) => {
        if (searchText !== '' && searchText !== null) {
          this.filteredMovieThumbnails = this.thumbnails.filter((m) =>
            containsCaseInsensitive(m.title, searchText)
          );
        } else {
          this.filteredMovieThumbnails = [...this.thumbnails];
        }
        this.changeDetectorRef.markForCheck();
        this.virtualScroller.scrollToPosition(0);
      });

    this.resizeImagesSubject.pipe(first()).subscribe(() => {
      // TODO - 17 offset is for scrollbar, if I use a custom scrollbar this will need to be changed
      this.resizeImages(17);
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

  thumbnailViewInit(): void {
    this.resizeImagesSubject.next();
  }
}
