import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from 'src/app/providers/places/places.service';
import { NavController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {

  place: Place;
  isLoading: boolean = false;
  private placeSub: Subscription;
  constructor(
    private aR: ActivatedRoute, 
    private navCtrl: NavController, 
    private placesService: PlacesService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.aR.paramMap.subscribe(param => {
      if (!param.has('placeId')) {
        this.navCtrl.navigateBack('/places/offer')
        return;
      }
      this.isLoading = true;
      this.placeSub = this.placesService.getPlaceById(param.get('placeId')).subscribe(place=>{
        this.place = place;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.alertCtrl
          .create({
            header: 'An error occurred!',
            message: 'Place could not be fetched. Please try again later.',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  this.navCtrl.navigateBack(['/places/offers']);
                }
              }
            ]
          })
          .then(alertEl => {
            alertEl.present();
          });
      })
    })
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  onEdit() {
    console.log('edit',this.place.id)
    this.navCtrl.navigateForward(['/', 'places', 'offers', 'edit-offer', this.place.id])
  }

  ngOnDestroy(){
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }

}
