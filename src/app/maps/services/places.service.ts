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
  public userDeniedLocation = false;
  public maxDistance = 10; // Ajustado maxDistance a 10 km

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
          // console.log(`coords.longitude: ${coords.longitude}, coords.latitude: ${coords.latitude}`);

          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (err) => {
          this.userDeniedLocation = true;
          resolve([0, 0]);
        }
      );
    });
  }

  getCityFromFeature(feature: Feature): string {
    const cityObject = feature.context.find((contextObject) =>
      contextObject.id.startsWith('place')
    );
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
        this.isLoadingPlaces = false;
        this.places = resp.features;
        this.cities = this.places.map(this.getCityFromFeature);
        this.mapService.createMarkersFromPlaces(this.places, this.useLocation!);
      });
  }

  deletePlaces() {
    this.places = [];
  }

  calculateDistance(lon1: number, lat1: number, lon2: number, lat2: number): number {
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
    return d; // Devuelve la distancia en km
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  checkPostalCode(postalCode: string): Observable<boolean> {
    return this.placesApi
      .get<PlacesResponse>(`/${postalCode}.json`, {
        params: {
          types: 'postcode',
        },
      })
      .pipe(map((resp) => resp.features.length > 0));
  }
}
