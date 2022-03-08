import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ErrorModel } from '../../shared/models/error.model';
import { RegisterRequestModel } from '../models/register.model';
import {
  authenticationRegister,
  authenticationRegisterSuccess,
} from '../state/authentication.actions';
import { getAuthenticationError } from '../state/authentication.selectors';

const checkPasswords: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  let pass = group.parent?.get('password')?.value;
  let confirmPass = group.parent?.get('confirmPassword')?.value;
  return pass === confirmPass ? null : { notSame: true };
};

@Component({
  selector: 'pip-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
  emailHasBeenSent = false;

  error: ErrorModel | null = null;

  form: FormGroup;

  headerText = 'Register';

  private destroyed$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private actions$: Actions,

    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [
        Validators.email,
        Validators.required,
      ]),
      firstName: this.formBuilder.control(null, [Validators.required]),
      lastName: this.formBuilder.control(null, [Validators.required]),
      password: this.formBuilder.control(null, [Validators.required]),
      confirmPassword: this.formBuilder.control(null, [
        Validators.required,
        checkPasswords,
      ]),
    });
  }

  ngOnInit(): void {
    this.actions$
      .pipe(ofType(authenticationRegisterSuccess), take(1))
      .subscribe(() => {
        this.emailSent();
        this.changeDetectorRef.detectChanges();
      });
    this.store
      .select(getAuthenticationError)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((error) => {
        this.error = error;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  register(form: FormGroup): void {
    const register: RegisterRequestModel = form.value;
    this.store.dispatch(authenticationRegister({ register }));
  }

  private emailSent(): void {
    this.emailHasBeenSent = true;
    this.headerText = 'Registered';
  }
}
