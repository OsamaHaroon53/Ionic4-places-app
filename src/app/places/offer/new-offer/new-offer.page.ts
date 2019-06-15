import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { PlacesService } from 'src/app/providers/places/places.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

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
      }),
      location: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null),
    })
  }

  onCreateOffer() {
    if (!this.place.valid || !this.place.get('image').value) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Creating place...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.placesService
          .uploadImage(this.place.get('image').value)
          .pipe(
            switchMap(uploadRes => {
              return this.placesService.addPlace(
                this.place.value.title,
                this.place.value.description,
                +this.place.value.price,
                new Date(this.place.value.dateFrom),
                new Date(this.place.value.dateTo),
                this.place.value.location,
                uploadRes.imageUrl
              );
            })
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.place.reset();
            this.navCtrl.navigateBack(['/places/offers']);
          },err=>{
            loadingEl.dismiss();
          });
      });
  }

  setLocation(location) {
    console.log(location)
    this.place.patchValue({ location: location })
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.place.patchValue({ image: imageFile });
  }


}
