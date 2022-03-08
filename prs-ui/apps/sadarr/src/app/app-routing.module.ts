import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "./guards/admin.guard";
import { AuthenticationGuard } from "./guards/authentication.guard";

export const authenticationPath = "authentication";

const routes: Routes = [
  {
    path: "sonarr",
    loadChildren: () =>
      import("./sonarr/sonarr.module").then((m) => m.SonarrModule),
    canActivate: [AuthenticationGuard],
    data: {
      title: "Tv Shows",
    },
  },
  {
    path: "radarr",
    loadChildren: () =>
      import("./radarr/radarr.module").then((m) => m.RadarrModule),
    canActivate: [AuthenticationGuard],
    data: {
      title: "Movies",
    },
  },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
    canActivate: [AuthenticationGuard],
    data: {
      title: "Home",
    },
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
    canActivate: [AuthenticationGuard, AdminGuard],
    data: {
      title: "Admin",
    },
  },
  {
    path: authenticationPath,
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
