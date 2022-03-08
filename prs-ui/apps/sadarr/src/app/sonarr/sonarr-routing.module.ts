import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SonarrComponent } from './sonarr.component';

const routes: Routes = [
  {
    path: '',
    component: SonarrComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SonarrRoutingModule {}
