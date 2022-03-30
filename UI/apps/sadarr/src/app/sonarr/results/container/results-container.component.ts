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
import { AddEvent, Series } from '../../model/series';

@Component({
  selector: 'pip-sonarr-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.scss'],
  host: { class: 'sonarr-results-container' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsContainerComponent {
  @Input()
  public set data(value: Series[] | null) {
    if (value === null) {
      value = [];
    }
    this._data = value;
  }
  public get data(): Series[] {
    return this._data;
  }
  private _data: Series[] = [];

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
