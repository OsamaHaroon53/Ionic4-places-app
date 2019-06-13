import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from 'src/app/providers/places.service';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  places: Place[] = [];
  placesClone: Place[];
  selectedTap = 'all'
  private placesSub: Subscription;
  constructor(private placesService: PlacesService, private auth: AuthService) { }

  ngOnInit() {
    this.placesSub = this.placesService.getPlaces.subscribe(places => {
      this.placesClone = places;
      if (this.selectedTap === 'all') {
        this.places = this.placesClone;
        // this.relevantPlaces = this.loadedPlaces;
        // this.listedLoadedPlaces = this.relevantPlaces.slice(1);
      } else {
        this.places = this.placesClone.filter(
          place => place.userId !== this.auth.getUserId()
        );
        // this.relevantPlaces = this.loadedPlaces.filter(
        //   place => place.userId !== this.authService.userId
        // );
        // this.listedLoadedPlaces = this.relevantPlaces.slice(1);
      }
    });
  }

  filter(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail.value);
    this.selectedTap = event.detail.value;
    if (this.selectedTap === 'all') {
      this.places = this.placesClone;
      // this.relevantPlaces = this.loadedPlaces;
      // this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    } else {
      this.places = this.placesClone.filter(
        place => place.userId !== this.auth.getUserId()
      );
      console.log(this.places,this.auth.getUserId())
      // this.relevantPlaces = this.loadedPlaces.filter(
      //   place => place.userId !== this.authService.userId
      // );
      // this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  ionViewWillEnter() {
    console.log('view')
  }

}
