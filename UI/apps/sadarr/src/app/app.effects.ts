import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';
import { selectRouteData } from './router/router.reducer';
import { TitleService } from './shared/api/title.service';

@Injectable()
export class AppEffects {
  updateSiteTitle$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        withLatestFrom(this.store.pipe(select(selectRouteData))),
        tap(([_action, routeData]) => {
          this.titleService.setTitle(routeData.title);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private store: Store,
    private titleService: TitleService
  ) {}
}
