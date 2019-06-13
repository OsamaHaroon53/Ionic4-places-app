import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from 'src/app/providers/places.service';
import { Place } from '../place.model';
import { IonItemSliding, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit, OnDestroy {

  places: Place[] = [];
  private placesSub: Subscription;
  constructor(private placesService: PlacesService, private navCtrl: NavController) { }

  ngOnInit() {
    this.placesSub = this.placesService.getPlaces.subscribe(places=>{
      this.places = places;
    })
  }

  edit(place, slide: IonItemSliding) {
    console.log(place);
    slide.close();
    this.navCtrl.navigateForward('/places/offers/edit-offer/' + place.id)
  }

  getDummyDate() {
    return new Date();
  }

  ngOnDestroy(){
    if(this.placesSub){
      this.placesSub.unsubscribe();
    }
  }

}
