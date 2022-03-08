import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { merge, Observable, of } from 'rxjs';
import { first, mapTo, switchMap, tap } from 'rxjs/operators';
import { UserModel } from './models/user.model';
import {
  authenticationUnverifiedSession,
  authenticationVerifiedSessionFailure,
  authenticationVerifiedSessionSuccess,
} from './state/authentication.actions';
import { AuthenticationPartialState } from './state/authentication.reducer';
import { getAuthenticationIsLoggedIn } from './state/authentication.selectors';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private cookieKey = 'Bearer';
  private currentUserKey = 'currentUser';

  constructor(
    private cookieService: CookieService,
    private readonly actions$: Actions,
    private store: Store<AuthenticationPartialState>,
    private router: Router
  ) {}

  checkLogin(state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(getAuthenticationIsLoggedIn).pipe(
      first(),
      switchMap((isLoggedIn) => {
        if (isLoggedIn) {
          return of(true);
        }

        return this.verifySession(state);
      })
    );
  }

  getCookie(): string {
    return this.cookieService.get(this.cookieKey);
  }

  getCurrentUser(): UserModel | null {
    const currentUser = localStorage.getItem(this.currentUserKey);
    if (currentUser) {
      return JSON.parse(currentUser);
    }
    return null;
  }

  resetLocalStorageAndCookies(): void {
    localStorage.clear();
    this.cookieService.deleteAll();
  }

  setCookieToCurrentUserToken(): void {
    const user: UserModel | null = this.getCurrentUser();
    if (user && !this.getCookie()) {
      this.cookieService.set('Bearer', user.token);
    }
  }

  setCurrentUser(loginResponse: UserModel): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(loginResponse));
    this.setCookieToCurrentUserToken();
  }

  verifySession(state: RouterStateSnapshot): Observable<boolean> {
    const success = this.actions$.pipe(
      ofType(authenticationVerifiedSessionSuccess),
      mapTo(true)
    );

    const failure = this.actions$.pipe(
      ofType(authenticationVerifiedSessionFailure),
      tap(() => {
        this.redirectToLogin(state);
      }),
      mapTo(false)
    );

    this.store.dispatch(authenticationUnverifiedSession());

    return merge(success, failure);
  }

  redirectToLogin(state: RouterStateSnapshot): Observable<boolean> {
    this.router.navigate(['/authentication/login'], {
      queryParams: { redirectUrl: state.url },
    });
    return of(false);
  }
}
