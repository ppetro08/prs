import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { authenticationLogout } from '../authentication/state/authentication.actions';
import {
  getAuthenticationIsAdmin,
  getUser,
} from '../authentication/state/authentication.selectors';

@Component({
  selector: 'pip-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'pip-nav-bar' },
})
export class NavBarComponent {
  userName: string;

  isAdmin: Observable<boolean>;

  constructor(private store: Store, private router: Router) {
    this.isAdmin = this.store.select(getAuthenticationIsAdmin);

    this.store
      .select(getUser)
      .pipe(filter((u) => u !== null))
      .subscribe((u) => {
        if (u) {
          this.userName = `${u.firstName} ${u.lastName}`;
        }
      });
  }

  logout(): void {
    this.store.dispatch(authenticationLogout());
  }
}
