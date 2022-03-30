import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { merge, Observable, of } from 'rxjs';
import { first, mapTo, switchMap, tap } from 'rxjs/operators';
import { PrsApiService } from '../shared/api/prs.api.service';
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
    private router: Router,
    private prsApiService: PrsApiService
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

  redirectToLogin(state: RouterStateSnapshot): Observable<boolean> {
    this.router.navigate(['/authentication/login'], {
      queryParams: { redirectUrl: state.url },
    });
    return of(false);
  }

  resetLocalStorageAndCookies(): void {
    localStorage.clear();
    this.cookieService.deleteAll();
  }

  setCookieToCurrentUserToken(): void {
    const user: UserModel | null = this.getCurrentUser();
    if (user && this.getCookie() !== user.token) {
      this.cookieService.set(this.cookieKey, user.token);
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

    if (!this.prsApiService.getHeaders()) {
      this.setHeaders();
    }

    this.store.dispatch(authenticationUnverifiedSession());

    return merge(success, failure);
  }

  setHeaders(): void {
    const token = this.getCookie();
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `${this.cookieKey} ${token}`,
    });
    this.prsApiService.setHeaders(httpHeaders);
  }
}
