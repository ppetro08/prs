import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { AuthenticationApiService } from '../../api/authentication.api.service';
import { selectQueryParams } from '../../router/router.reducer';
import { AuthenticationService } from '../authentication.service';
import * as AuthenticationActions from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
  confirmRegistration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthenticationActions.authenticationConfirmRegistration),
      fetch({
        run: ({ confirmRegistrationRequest }) => {
          return this.authenticationApiService
            .confirmRegistration({
              token: confirmRegistrationRequest.token,
              userId: confirmRegistrationRequest.userId,
            })
            .pipe(
              map(() => {
                return AuthenticationActions.authenticationConfirmRegistrationSuccess();
              })
            );
        },
        onError: (action, { error }) => {
          return AuthenticationActions.authenticationConfirmRegistrationFailure(
            { error }
          );
        },
      })
    );
  });

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.authenticationLogin),
      fetch({
        run: ({ login }) => {
          return this.authenticationApiService.login(login).pipe(
            map((loginResponse) => {
              return AuthenticationActions.authenticationLoginSuccess({
                user: { ...loginResponse, emailConfirmed: true },
              });
            })
          );
        },
        onError: (action, { error }) => {
          return AuthenticationActions.authenticationLoginFailure({ error });
        },
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthenticationActions.authenticationLoginSuccess),
        withLatestFrom(this.store.select(selectQueryParams)),
        tap(([{ user }, queryParams]) => {
          this.authenticationService.setCurrentUser(user);
          if (queryParams.redirectUrl) {
            this.router.navigateByUrl(queryParams.redirectUrl);
          } else {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthenticationActions.authenticationLogout),
        tap(() => {
          this.authenticationService.resetLocalStorageAndCookies();
          this.router.navigate(['/authentication/login']);
        })
      );
    },
    { dispatch: false }
  );

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthenticationActions.authenticationRegister),
      fetch({
        run: (action) => {
          return this.authenticationApiService.register(action.register).pipe(
            map(() => {
              return AuthenticationActions.authenticationRegisterSuccess();
            })
          );
        },
        onError: (action, { error }) => {
          return AuthenticationActions.authenticationRegisterFailure({ error });
        },
      })
    );
  });

  unverifiedSession$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthenticationActions.authenticationUnverifiedSession),
      mergeMap(() => {
        const hasSessionResponse = this.authenticationApiService.checkSession();
        return hasSessionResponse.pipe(
          map((hasSession) => {
            const currentUser = this.authenticationService.getCurrentUser();
            if (hasSession && currentUser) {
              const cookie = this.authenticationService.getCookie();
              if (!cookie) {
                this.authenticationService.setCookieToCurrentUserToken();
              }

              return AuthenticationActions.authenticationVerifiedSessionSuccess(
                { user: currentUser }
              );
            } else {
              return AuthenticationActions.authenticationVerifiedSessionFailure(
                { error: 'Invalid Session' }
              );
            }
          }),
          catchError(({ error }) => {
            return of(
              AuthenticationActions.authenticationVerifiedSessionFailure({
                error,
              })
            );
          })
        );
      })
    );
  });

  updatePrsApiHeaders = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthenticationActions.authenticationLoginSuccess),
        tap(() => {
          this.authenticationService.setHeaders();
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private router: Router,
    private store: Store,
    private authenticationService: AuthenticationService,
    private authenticationApiService: AuthenticationApiService
  ) {}
}
