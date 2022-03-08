import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { LozengeIconDirective } from './lozenge-icon.directive';

export type LozengeSize = 'small' | 'medium' | 'large';

export type LozengeColor = 'primary' | 'success' | 'warn';

@Component({
  selector: 'pip-lozenge',
  templateUrl: './lozenge.component.html',
  styleUrls: ['./lozenge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lozenge',
  },
  encapsulation: ViewEncapsulation.None,
})
export class LozengeComponent {
  @Input()
  public set lozengeColor(value: LozengeColor) {
    this._lozengeColor = value;
    this.updateClasses();
  }
  public get lozengeColor(): LozengeColor {
    return this._lozengeColor;
  }
  private _lozengeColor: LozengeColor = 'primary';

  @Input()
  public set lozengeSize(value: LozengeSize) {
    this._lozengeSize = value;
    this.updateClasses();
  }
  public get lozengeSize(): LozengeSize {
    return this._lozengeSize;
  }
  private _lozengeSize: LozengeSize = 'medium';

  @ContentChild(LozengeIconDirective)
  public set iconDirective(value: LozengeIconDirective | null) {
    this._iconDirective = value;
    this.updateClasses();
  }
  public get iconDirective(): LozengeIconDirective | null {
    return this._iconDirective;
  }
  private _iconDirective: LozengeIconDirective | null = null;

  cssClasses: string = '';

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  private updateClasses(): void {
    const cssClasses: string[] = [];
    if (this.lozengeColor) {
      cssClasses.push(`lozenge-${this.lozengeColor}`);
    }
    if (this.lozengeSize) {
      cssClasses.push(`lozenge-${this.lozengeSize}`);
    }
    if (this.iconDirective) {
      cssClasses.push(`lozenge-with-icon`);
    }

    this.cssClasses = cssClasses.join(' ');
    this.changeDetectorRef.detectChanges();
  }
}
