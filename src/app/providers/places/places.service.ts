import { Injectable } from '@angular/core';
import { Place } from '../../places/place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PlaceLocation } from 'src/app/places/location.model';

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  url: string;
  price: number;
  title: string;
  userId: string;
  location: PlaceLocation;
}

@Injectable({
  providedIn: 'root'
})

export class PlacesService {

  baseUrl = 'https://places-ionic-app.firebaseio.com/places';
  _places = new BehaviorSubject<Place[]>([]);

  constructor(private auth: AuthService, private http: HttpClient) { }

  get getPlaces() {
    return this._places.asObservable();
  }

  fetchPlaces() {
    return this.http
      .get<{ [key: string]: PlaceData }>(`${this.baseUrl}.json`)
      .pipe(
        map(resData => {
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].url,
                  resData[key].price,
                  resData[key].userId,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].location,
                )
              );
            }
          }
          return places;
          // return [];
        }),
        tap(places => {
          this._places.next(places);
        })
      );
  }

  getPlaceById(id) {
    return this.http
      .get<PlaceData>(
        `${this.baseUrl}/${id}.json`
      )
      .pipe(
        map(placeData => {
          return new Place(
            id,
            placeData.title,
            placeData.description,
            placeData.url,
            placeData.price,
            placeData.userId,
            new Date(placeData.availableFrom),
            new Date(placeData.availableTo),
            placeData.location,
          );
        })
      );
  }

  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);

    return this.http.post<{imageUrl: string, imagePath: string}>(
      'https://us-central1-places-ionic-app.cloudfunctions.net/storeImage',
      uploadData
    );
  }

  addPlace(title, description, img, price, dateFrom, dateTo, location) {
    let id: string;
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      img,
      price,
      this.auth.getUserId(),
      dateFrom, dateTo,
      location
    );
    return this.http.post<{ name: string }>(`${this.baseUrl}.json`, { ...newPlace, id: null })
      .pipe(
        switchMap(res => {
          id = res.name;
          return this.getPlaces;
        }),
        take(1),
        tap(places => {
          newPlace.id = id;
          this._places.next(places.concat(newPlace))
        })
      );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.getPlaces.pipe(
      take(1),
      switchMap(places => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.url,
          oldPlace.price,
          oldPlace.userId,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.location,
        );
        return this.http.put(
          `${this.baseUrl}/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }

}
