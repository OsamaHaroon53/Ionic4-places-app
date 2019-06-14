import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ActionSheetController, LoadingController, AlertController } from '@ionic/angular';
import { PlacesService } from 'src/app/providers/places/places.service';
import { ActivatedRoute } from '@angular/router';
import { Place } from '../../place.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { CreateBookingPage } from 'src/app/bookings/create-booking/create-booking.page';
import { BookingService } from 'src/app/providers/booking/booking.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: Place;
  isBookable = false;
  isLoading: boolean = false;
  private placeSub: Subscription;

  constructor(
    private aR: ActivatedRoute, 
    private navCtrl: NavController, 
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    this.aR.paramMap.subscribe(param=>{
      if(!param.has('placeId')){
        this.navCtrl.navigateBack('/places/discover')
        return;
      }
      this.placeSub = this.placesService.getPlaceById(param.get('placeId')).subscribe(place=>{
        this.place = place;
        this.isBookable = place.userId !== this.authService.getUserId();
      },
      error => {
        this.alertCtrl
          .create({
            header: 'An error occurred!',
            message: 'Place could not be found. Please try again later.',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  this.navCtrl.navigateBack(['/places/discover']);
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

  onBook(){
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            }
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingPage,
        componentProps: { selectedPlace: this.place, selectedMode: mode }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({ message: 'Booking place...' })
            .then(loadingEl => {
              loadingEl.present();
              const data = resultData.data.bookingData;
              this.bookingService
                .addBooking(
                  this.place.id,
                  this.place.title,
                  this.place.url,
                  data.firstName,
                  data.lastName,
                  data.guestNumber,
                  data.startDate,
                  data.endDate
                )
                .subscribe(() => {
                  loadingEl.dismiss();
                  this.navCtrl.navigateBack('/places');
                });
            });
        }
      });
  }

  ngOnDestroy(){
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }

}
