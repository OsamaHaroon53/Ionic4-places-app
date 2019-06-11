import { Injectable } from '@angular/core';
import { Place } from '../places/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  places: Place[] = [
    new Place(
      '1',
      'Karachi',
      'Karachi is the biggest city of Pakistan',
      'https://www.thenews.com.pk//assets/uploads/updates/2019-03-19/446094_8279721_11_updates.jpg',
      1800
    ),
    new Place(
      '2',
      'Lahore',
      'Lahore is the **** city of Pakistan',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdSLnDIdnAu3OysAk3Kq6hbz1FHr2izmfa8kmjhTGbo6EbQqopbA',
      1600
    ),
    new Place(
      '1',
      'Islamabad',
      'Islamabad is the capital of Pakistan',
      'https://www.samaa.tv/wp-content/uploads/2019/05/islamabad-640x384.jpg',
      1300
    ),
  ]

  constructor() { }

  getPlaces(){
    return [...this.places];
  }

  getPlaceById(id){
    return {...this.places.find(el=>el.id===id)};
  }
}
