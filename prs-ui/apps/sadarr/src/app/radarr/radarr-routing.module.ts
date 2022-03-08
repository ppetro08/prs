import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadarrComponent } from './radarr.component';

const routes: Routes = [
  {
    path: '',
    component: RadarrComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RadarrRoutingModule {}
