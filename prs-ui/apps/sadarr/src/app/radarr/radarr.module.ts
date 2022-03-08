import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';
import { MovieRequestsApiService } from '../api/movie-requests.api.service';
import { API_SETTINGS } from '../shared/api/app-settings';
import { PrsApiService } from '../shared/api/prs.api.service';
import { LoadingOverlayModule } from '../shared/loading-overlay/loading-overlay.module';
import { RadarrRoutingModule } from './radarr-routing.module';
import { RadarrApiService } from './radarr.api.service';
import { RadarrComponent } from './radarr.component';
import { ResultsModule } from './results/results.module';
import { RadarrEffects } from './state/radarr.effects';
import * as fromRadarr from './state/radarr.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoadingOverlayModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    ResultsModule,
    RadarrRoutingModule,
    StoreModule.forFeature(fromRadarr.RADARR_FEATURE_KEY, fromRadarr.reducer),
    EffectsModule.forFeature([RadarrEffects]),
  ],
  declarations: [RadarrComponent],
  providers: [
    RadarrApiService,
    DataPersistence,
    MovieRequestsApiService,
    PrsApiService,
    {
      provide: API_SETTINGS,
      useValue: {
        url: 'https://piperopni.ddns.net/radarr/api/v3',
        key: 'X-Api-Key',
        value: '4020ff99a9774d62b03e519964cf8497',
      },
    },
  ],
})
export class RadarrModule {}
