import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './providers/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'places',
    pathMatch: 'full'
  },
  { path: 'places', loadChildren: './places/places.module#PlacesPageModule', canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'bookings', loadChildren: './bookings/bookings.module#BookingsPageModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
