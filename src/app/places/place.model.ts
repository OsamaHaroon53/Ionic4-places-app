import { PlaceLocation } from './location.model';

export class Place{
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public url: string,
        public price: number,
        public userId: string,
        public availableFrom: Date,
        public availableTo: Date,
        public location: PlaceLocation
    ){}
}