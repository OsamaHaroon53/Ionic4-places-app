import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Booking } from './bookings.model';
import { BookingService } from '../providers/booking/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  loadedBookings: Booking[];
  private bookingSub: Subscription;
  isLoading: boolean = false;

  constructor(
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.bookingService.fetchBookings().subscribe(() => {
      this.isLoading = false;
    },err=>{
      this.isLoading = false;
    });
  }

  onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl.create({ message: 'Cancelling...' }).then(loadingEl => {
      loadingEl.present();
      this.bookingService.cancelBooking(bookingId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }

}
