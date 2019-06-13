import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from 'src/app/providers/places.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {

  place: Place;
  constructor(private aR: ActivatedRoute, private navCtrl: NavController, private placesService: PlacesService) { }

  ngOnInit() {
    this.aR.paramMap.subscribe(param => {
      if (!param.has('placeId')) {
        this.navCtrl.navigateBack('/places/offer')
        return;
      }
      this.place = this.placesService.getPlaceById(param.get('placeId'))
    })
  }

  onEdit() {
    console.log('edit',this.place.id)
    this.navCtrl.navigateForward(['/', 'places', 'offers', 'edit-offer', this.place.id])
  }

}
