import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationEffects } from './authentication/state/authentication.effects';
import * as AuthenticationReducer from './authentication/state/authentication.reducer';
import { HomeModule } from './home/home.module';
import { routerStateKey } from './router/router.reducer';
import { INTERNAL_API_SETTINGS } from './shared/api/app-settings';
import { CoreEffects } from './shared/state/core-state.effects';
import * as fromCore from './shared/state/core-state.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    BrowserModule,
    HomeModule,
    HttpClientModule,
    MatButtonModule,
    StoreModule.forRoot(
      {
        [AuthenticationReducer.AUTHENTICATION_FEATURE_KEY]:
          AuthenticationReducer.reducer,
        router: routerReducer,
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    StoreRouterConnectingModule.forRoot({
      stateKey: routerStateKey,
    }),
    EffectsModule.forRoot([AuthenticationEffects, AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(fromCore.CORE_FEATURE_KEY, fromCore.reducer),
    EffectsModule.forFeature([CoreEffects]),
  ],
  bootstrap: [AppComponent],
  providers: [
    CookieService,
    {
      provide: INTERNAL_API_SETTINGS,
      useValue: {
        url: environment.prsApiUrl,
      },
    },
  ],
})
export class AppModule {}
