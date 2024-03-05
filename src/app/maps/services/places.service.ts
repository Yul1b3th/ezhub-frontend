import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api';
import { MapService } from '.';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public useLocation?: [number, number];

  public isLoadingPlaces = false;
  public places: Feature[] = [];
  public cities: string[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapService
  ) {
    this.getUserLocation();
  }

  // Metodo para saber cuando ya tenemos la geolocalizacion del usuario
  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (err) => {
          alert(err.message);
          console.log(err);
          reject();
        }
      );
    });
  }

  getCityFromFeature(feature: Feature): string {
    // Buscamos el objeto que representa la ciudad en el contexto
    const cityObject = feature.context.find((contextObject) =>
      contextObject.id.startsWith('place')
    );

    // Devolvemos el nombre de la ciudad
    return cityObject ? cityObject.text_es : '';
  }

  getPlacesByQuery(query: string = '') {
    if (query.length === 0) {
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }

    if (!this.useLocation) throw Error('No hay userLocation');

    this.isLoadingPlaces = true;

    this.placesApi
      .get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.useLocation.join(','),
        },
      })
      .subscribe((resp) => {
        console.log('resp', resp.features);
        this.isLoadingPlaces = false;
        this.places = resp.features;
        this.cities = this.places.map(this.getCityFromFeature);
        console.log(this.cities);

        this.mapService.createMarkersFromPlaces(this.places, this.useLocation!);
      });
  }

  deletePlaces() {
    this.places = [];
  }
}
