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
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { MovieRequestsApiService } from '../api/movie-requests.api.service';
import { LoadingOverlayModule } from '../shared/loading-overlay/loading-overlay.module';
import { ThumbnailModule } from '../shared/thumbnail/thumbnail.module';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { ExistingMovieComponent } from './existing-movie/existing-movie.component';
import { QualityModule } from './pipes/quality.module';
import { RadarrRoutingModule } from './radarr-routing.module';
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
    QualityModule,
    ReactiveFormsModule,
    ResultsModule,
    RadarrRoutingModule,
    ThumbnailModule,
    VirtualScrollerModule,
    StoreModule.forFeature(fromRadarr.RADARR_FEATURE_KEY, fromRadarr.reducer),
    EffectsModule.forFeature([RadarrEffects]),
  ],
  declarations: [AddMovieComponent, ExistingMovieComponent],
  providers: [DataPersistence, MovieRequestsApiService],
})
export class RadarrModule {}
