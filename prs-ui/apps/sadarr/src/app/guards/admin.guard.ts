import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { AuthenticationPartialState } from '../authentication/state/authentication.reducer';
import { getAuthenticationIsAdmin } from '../authentication/state/authentication.selectors';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private store: Store<AuthenticationPartialState>,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authenticationService.checkLogin(state).pipe(
      first(),
      switchMap((value) => {
        if (value) {
          return this.store.select(getAuthenticationIsAdmin);
        }
        return of(false);
      })
    );
  }
}
