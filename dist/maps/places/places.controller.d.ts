import { PlacesService } from './places.service';
export declare class PlacesController {
    private readonly placesServices;
    constructor(placesServices: PlacesService);
    findPlaces(text: string): Promise<import("@googlemaps/google-maps-services-js").FindPlaceFromTextResponseData>;
}
