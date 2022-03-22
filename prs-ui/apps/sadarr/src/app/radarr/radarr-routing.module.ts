import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { ExistingMovieComponent } from './existing-movie/existing-movie.component';

const routes: Routes = [
  {
    path: 'movies',
    component: ExistingMovieComponent,
    data: {
      title: 'Movies',
    },
  },
  {
    path: 'movies/:id',
    component: ExistingMovieComponent,
    data: {
      title: 'Movies',
    },
  },
  {
    path: 'add-movie',
    component: AddMovieComponent,
    data: {
      title: 'Add Movie',
    },
  },
  {
    path: '',
    redirectTo: 'add-movie',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RadarrRoutingModule {}
