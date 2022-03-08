import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SeriesDetail } from '../../model/series-detail';

@Component({
  selector: 'pip-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailViewComponent {
  @Input() seriesDetail: SeriesDetail | null = null;

  displayedColumns: string[] = ['monitored', 'episodeNumber', 'title', 'airDate', 'status', 'search'];

  btnclick($event: MouseEvent): void {
    $event.stopPropagation();
    console.log('button clicked');
  }
}
