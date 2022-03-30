import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Profile } from './profile';

@Component({
  selector: 'pip-profile-select',
  templateUrl: './profile-select.component.html',
  styleUrls: ['./profile-select.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: ProfileSelectComponent },
  ],
})
export class ProfileSelectComponent
  implements OnDestroy, MatFormFieldControl<number>, ControlValueAccessor
{
  // #region MatFormControl implementation
  static nextId = 0;

  @Input() set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  get disabled() {
    return this._disabled;
  }

  private _disabled = false;

  @Input()
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  get required() {
    return this._required;
  }

  private _required = true;

  autofilled? = false;

  controlType?: string = 'pip-profile-select-input';

  empty = false;

  errorState = false;

  focused = false;

  id = `pip-profile-select-input-${ProfileSelectComponent.nextId}`;

  placeholder = '';

  shouldLabelFloat = true;

  stateChanges = new Subject<void>();

  userAriaDescribedBy?: string | undefined;
  // #endregion

  @Input() profiles: Profile[] = [];

  @ViewChild(MatSelect) matSelect?: MatSelect;

  set value(value: number | null) {
    this._value = value;
    this.stateChanges.next();
  }
  get value(): number | null {
    return this._value;
  }
  private _value: number | null = null;

  private destroyed$ = new Subject<void>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (_: any) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  constructor(
    private elementRef: ElementRef,
    @Optional() @Self() public ngControl: NgControl,
    private focusMonitor: FocusMonitor
  ) {
    if (ngControl != null) {
      ngControl.valueAccessor = this;
    }
    this.focusMonitor
      .monitor(this.elementRef.nativeElement, true)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((origin) => {
        this.focused = !!origin;
        this.stateChanges.next();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  handleMatSelectChange(matSelectChange: MatSelectChange): void {
    this.writeValue(matSelectChange.value);
    this.onChange(this.value);
  }

  // #region ValueControlAccessor implementation
  writeValue(profileId: number): void {
    this.value = profileId;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // #endregion

  // #region MatFormControl implementation
  onContainerClick(event: MouseEvent): void {
    if (
      (event.target as Element).tagName.toLowerCase() != 'input' &&
      this.matSelect !== undefined
    ) {
      this.matSelect.open();
      this.onTouched();
    }
  }

  setDescribedByIds(ids: string[]): void {
    const controlElement = this.elementRef.nativeElement;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }
  // #endregion
}
