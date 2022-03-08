import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { API_SETTINGS } from '../shared/api/app-settings';
import { PrsApiService } from '../shared/api/prs.api.service';
import { LoadingOverlayModule } from '../shared/loading-overlay/loading-overlay.module';
import { ResultsModule } from './results/results.module';
import { SonarrRoutingModule } from './sonarr-routing.module';
import { SonarrApiService } from './sonarr.api.service';
import { SonarrComponent } from './sonarr.component';
import { SonarrEffects } from './state/sonarr.effects';
import * as fromSonarr from './state/sonarr.reducer';

@NgModule({
  declarations: [SonarrComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoadingOverlayModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ResultsModule,
    SonarrRoutingModule,
    StoreModule.forFeature(fromSonarr.SONARR_FEATURE_KEY, fromSonarr.reducer),
    EffectsModule.forFeature([SonarrEffects]),
  ],
  providers: [
    SonarrApiService,
    PrsApiService,
    {
      provide: API_SETTINGS,
      useValue: {
        url: 'https://piperopni.ddns.net/sonarr/api/v3',
        key: 'X-Api-Key',
        value: '2ae85b65c2104fd1a85e4781d274d899',
      },
    },
  ],
})
export class SonarrModule {}
