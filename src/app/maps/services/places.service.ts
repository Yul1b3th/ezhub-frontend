import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api';
import { MapService } from '.';
import { Observable, map } from 'rxjs';

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
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
          console.log('useLocation', this.useLocation);
        },
        (err) => {
          //alert(err.message);
          console.log(err);
          // Resuelve la promesa con un valor predeterminado en lugar de rechazarla
          resolve([0, 0]);
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
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    console.log(this.useLocation);

    const R = 6371; // Radio de la tierra en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distancia en km
    return d <= 10; // Devuelve true si la distancia es menor o igual a 10 km
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  checkPostalCode(postalCode: string): Observable<boolean> {
    console.log('checkPostalCode');

    return this.placesApi
      .get<PlacesResponse>(`/${postalCode}.json`, {
        params: {
          types: 'postcode',
        },
      })
      .pipe(map((resp) => resp.features.length > 0));
  }
}
