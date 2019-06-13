import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { PlacesService } from 'src/app/providers/places.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  place: FormGroup;
  constructor(private loadingCtrl: LoadingController, private aR: ActivatedRoute, private navCtrl: NavController, private placesService: PlacesService) {
    
  }

  ngOnInit() {
    this.place = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        validators: [Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl(null, {
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        validators: [Validators.required]
      })
    })
  }

  onCreateOffer() {
    if (!this.place.valid) {
      return;
    }
    console.log(this.place.value);
    this.loadingCtrl
      .create({
        message: 'Creating place...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.placesService
          .addPlace(
            this.place.value.title,
            this.place.value.description,
            'https://www.thenews.com.pk//assets/uploads/updates/2019-03-19/446094_8279721_11_updates.jpg',
            +this.place.value.price,
            new Date(this.place.value.dateFrom),
            new Date(this.place.value.dateTo)
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.place.reset();
            this.navCtrl.navigateBack(['/places/offers']);
          });
      });
  }

  
}
