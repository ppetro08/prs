import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { AuthenticationPartialState } from '../authentication/state/authentication.reducer';
import { getUser } from '../authentication/state/authentication.selectors';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
  constructor(
    private store: Store<AuthenticationPartialState>,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(getUser).pipe(
      switchMap((user) => {
        if (user) {
          return of(true);
        }

        if (!this.authenticationService.getCurrentUser()) {
          return this.authenticationService.redirectToLogin(state);
        }

        return this.authenticationService.verifySession(state);
      })
    );
  }
}
