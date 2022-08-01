import { Component, isDevMode } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { appInit } from './app.actions';
import { getAuthenticationIsLoggedIn } from './authentication/state/authentication.selectors';
import { isAuthenticationRoute } from './shared/utils/string-extensions';

@Component({
  selector: 'pip-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'pip-root',
  },
})
export class AppComponent {
  showNavBar: Observable<boolean>;
  constructor(private store: Store, private router: Router) {
    // @ts-ignore
    if (isDevMode() && window.Cypress) {
      // @ts-ignore
      window.store = this.store;
    }

    this.store.dispatch(appInit());

    this.showNavBar = combineLatest([
      this.store.select(getAuthenticationIsLoggedIn),
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ),
    ]).pipe(
      map(([isLoggedIn, route]) => {
        return (
          isLoggedIn && !isAuthenticationRoute((route as NavigationEnd).url)
        );
      })
    );
  }
}
