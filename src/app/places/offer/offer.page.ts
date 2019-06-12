import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/providers/places.service';
import { Place } from '../place.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {

  places: Place[] = [];
  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.places = this.placesService.getPlaces();
  }

  edit(place,slide:IonItemSliding){
    console.log(place);
    slide.close();
  }

}
