import { Component, Input } from '@angular/core';

@Component({
  selector: 'pip-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
  host: { class: 'loading-overlay' },
})
export class LoadingOverlayComponent {
  @Input() diameter: number = 35;

  @Input() show: boolean | null = false;

  @Input() strokeWidth: number = 4;
}
