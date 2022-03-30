import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ErrorModel } from '../../shared/models/error.model';
import {
  authenticationConfirmRegistration,
  authenticationConfirmRegistrationSuccess,
} from '../state/authentication.actions';
import { getAuthenticationError } from '../state/authentication.selectors';

@Component({
  selector: 'pip-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmRegistrationComponent implements OnInit, OnDestroy {
  error: ErrorModel | null = null;

  verified = false;

  private destroyed$ = new Subject<void>();

  private queryParamMap: ParamMap | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private actions$: Actions,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.queryParamMap = this.activatedRoute.snapshot.queryParamMap;

    this.actions$
      .pipe(ofType(authenticationConfirmRegistrationSuccess), take(1))
      .subscribe(() => {
        this.verified = true;
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

  confirmRegistration(): void {
    const token = this.queryParamMap?.get('token');
    const userId = this.queryParamMap?.get('userId');

    if (token && userId) {
      this.store.dispatch(
        authenticationConfirmRegistration({
          confirmRegistrationRequest: { token, userId: Number(userId) },
        })
      );
    }
  }
}
