import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlacesPage } from './places.page';

const routes: Routes = [
  {
    path: '',
    component: PlacesPage,
    children: [
      {
        path: 'discover', 
        children: [
          { path: '', loadChildren: './discover/discover.module#DiscoverPageModule'},
          { path: ':placeId', loadChildren: './discover/place-detail/place-detail.module#PlaceDetailPageModule'}
        ]
      },
      {
        path: 'offers', 
        children: [
          { path: '', loadChildren: './offer/offer.module#OfferPageModule'},
          { path: 'new', loadChildren: './offer/new-offer/new-offer.module#NewOfferPageModule'},
          { path: ':placeId', loadChildren: './offer/offer-bookings/offer-bookings.module#OfferBookingsPageModule' }
        ]
      },
      { path: '**', redirectTo: 'discover'}
    ]
  },
  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlacesPage]
})
export class PlacesPageModule { }
