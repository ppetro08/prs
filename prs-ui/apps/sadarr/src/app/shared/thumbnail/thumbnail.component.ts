import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { MovieThumbnail } from './movie-thumbnail.model';

@Component({
  selector: 'pip-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbnailComponent implements AfterViewInit {
  @Input() thumbnail: MovieThumbnail;

  @HostBinding('style.width.px')
  @Input()
  width: number;

  @Output() viewInit = new EventEmitter<void>();

  ngAfterViewInit(): void {
    this.viewInit.emit();
  }
}
