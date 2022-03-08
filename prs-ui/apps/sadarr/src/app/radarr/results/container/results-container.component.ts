import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Profile } from '../../../shared/profile-select/profile';
import { AddEvent, Movie } from '../../models/radarr';

@Component({
  selector: 'pip-radarr-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.scss'],
  host: { class: 'radarr-results-container' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsContainerComponent {
  @Input()
  public set data(value: Movie[] | null) {
    if (value === null) {
      value = [];
    }
    this._data = value;
  }
  public get data(): Movie[] {
    return this._data;
  }
  private _data: Movie[] = [];

  @Input()
  public set profiles(value: Profile[] | null) {
    if (value === null) {
      value = [];
    }
    this._profiles = value;
  }
  public get profiles(): Profile[] {
    return this._profiles;
  }
  private _profiles: Profile[] = [];

  @Input() showNoResultsFound: boolean | null = null;

  @Output() addClick = new EventEmitter<AddEvent>();

  @ViewChild(CdkVirtualScrollViewport)
  cdkVirtualScrollViewport: CdkVirtualScrollViewport | null = null;

  addClicked(item: AddEvent): void {
    this.addClick.emit(item);
  }

  scrollToTop(): void {
    this.cdkVirtualScrollViewport?.scrollToOffset(0);
  }
}
