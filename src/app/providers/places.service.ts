import { Injectable } from '@angular/core';
import { Place } from '../places/place.model';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  _places = new BehaviorSubject<Place[]>([
    new Place(
      '1',
      'Karachi',
      'Karachi is the biggest city of Pakistan',
      'https://www.thenews.com.pk//assets/uploads/updates/2019-03-19/446094_8279721_11_updates.jpg',
      1800,
      'abc',
      new Date(),
      new Date()
    ),
    new Place(
      '2',
      'Lahore',
      'Lahore is the **** city of Pakistan',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdSLnDIdnAu3OysAk3Kq6hbz1FHr2izmfa8kmjhTGbo6EbQqopbA',
      1600,
      'abcd',
      new Date(),
      new Date()
    ),
    new Place(
      '1',
      'Islamabad',
      'Islamabad is the capital of Pakistan',
      'https://www.samaa.tv/wp-content/uploads/2019/05/islamabad-640x384.jpg',
      1300,
      'abc',
      new Date(),
      new Date()
    ),
  ]);

  constructor(private auth: AuthService) { }

  get getPlaces() {
    return this._places.asObservable();
  }

  getPlaceById(id) {
    return this.getPlaces.pipe(take(1),map(places=>{
      return { ...places.find(el => el.id === id) };
    }))
  }

  addPlace(title, description, img, price, dateFrom, dateTo) {

    const newPlace = new Place(Math.random().toString(), title, description, img, price, this.auth.getUserId(),dateFrom, dateTo);
    // this.places.push(newPlace);
    return this.getPlaces.pipe(
      take(1),
      delay(1000),
      tap(places => {
        this._places.next(places.concat(newPlace));
      })
    );
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.getPlaces.pipe(
      take(1),
      delay(1000),
      tap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.url,
          oldPlace.price,
          oldPlace.userId,
          oldPlace.availableFrom,
          oldPlace.availableTo
        );
        this._places.next(updatedPlaces);
      })
    );
  }

}
