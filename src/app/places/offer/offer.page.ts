import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from 'src/app/providers/places/places.service';
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
  isLoading: boolean = false;
  private placesSub: Subscription;
  constructor(private placesService: PlacesService, private navCtrl: NavController) { }

  ngOnInit() {
    // this.isLoading = false;
    this.placesSub = this.placesService.getPlaces.subscribe(places=>{
      this.places = places;
      // this.isLoading = true;
    })
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
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
