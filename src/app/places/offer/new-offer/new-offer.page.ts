import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from 'src/app/providers/places.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  place: Place;
  constructor(private aR: ActivatedRoute, private navCtrl: NavController, private placesService: PlacesService) { }

  ngOnInit() {
    // this.aR.paramMap.subscribe(param=>{
    //   if(!param.has('placeId')){
    //     this.navCtrl.navigateBack('/places/discover')
    //     return;
    //   }
    //   this.place = this.placesService.getPlaceById(param.get('placeId'))
    // })
  }

}
