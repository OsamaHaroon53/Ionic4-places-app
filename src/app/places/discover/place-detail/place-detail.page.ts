import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PlacesService } from 'src/app/providers/places.service';
import { ActivatedRoute } from '@angular/router';
import { Place } from '../../place.model';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: Place
  constructor(private aR: ActivatedRoute, private navCtrl: NavController, private placesService: PlacesService) { }

  ngOnInit() {
    this.aR.paramMap.subscribe(param=>{
      if(!param.has('placeId')){
        this.navCtrl.navigateBack('/places/discover')
        return;
      }
      this.place = this.placesService.getPlaceById(param.get('placeId'))
    })
  }

  OnBook(){
    this.navCtrl.navigateBack('/places/discover')
  }

}
