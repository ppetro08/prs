import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorModel } from '../../shared/models/error.model';
import { LoginRequestModel } from '../models/login.model';
import { authenticationLogin } from '../state/authentication.actions';
import { getAuthenticationError } from '../state/authentication.selectors';

@Component({
  selector: 'pip-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  error: ErrorModel | null = null;

  form: FormGroup;

  private destroyed$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [
        Validators.email,
        Validators.required,
      ]),
      password: this.formBuilder.control(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.store
      .select(getAuthenticationError)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((error) => {
        this.error = error;
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  login(form: FormGroup): void {
    const login: LoginRequestModel = form.value;
    this.store.dispatch(authenticationLogin({ login }));
  }
}
