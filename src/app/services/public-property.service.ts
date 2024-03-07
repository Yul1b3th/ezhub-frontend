import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Property } from '../interfaces/property.interface';
import { Observable, map, of } from 'rxjs';
import { PlacesService } from '../maps/services';

interface State {
  properties: Property[];
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class PublicPropertyService {
  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;

  #state = signal<State>({
    loading: true,
    properties: [],
  });

  // Señales computadas
  public properties = computed(() => this.#state().properties);
  public loading = computed(() => this.#state().loading);

  constructor(private placesService: PlacesService) {
    //this.getPublicProperties();
  }

  getPublicProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}/public-properties`);
  }

  /*    getPublicProperties(): void {
    this.http
      .get<Property[]>(`${this.baseUrl}/public-properties`)
      .subscribe((res) => {
        this.#state.set({
          loading: false,
          properties: res,
        });
        console.log(res);
      });
    console.log('Cargando data');
  }  */

  /*   getPublicProperties(): Observable<Property[]> {
     if (!this.placesService.useLocation) {
      console.error('No user location available');
      return of([]);
    }

    if (this.placesService.useLocation) {
      const [userLongitude, userLatitude] = this.placesService.useLocation;
      console.log(userLongitude, userLatitude);

      return this.http
        .get<Property[]>(`${this.baseUrl}/public-properties`)
        .pipe(
          map((properties) => {
            return properties.filter((property) => {
              return this.placesService.calculateDistance(
                userLongitude,
                userLatitude,
                Number(property.longitude),
                Number(property.latitude)
              );
            });
          })
        );
    }
  } */

  /*   getPublicProperties(): Observable<Property[]> {
    if (this.placesService.useLocation) {
      const [userLongitude, userLatitude] = this.placesService.useLocation;
      console.log(userLongitude, userLatitude);

      return this.http
        .get<Property[]>(`${this.baseUrl}/public-properties`)
        .pipe(
          map((properties) => {
            return properties.filter((property) => {
              return this.placesService.calculateDistance(
                userLongitude,
                userLatitude,
                Number(property.longitude),
                Number(property.latitude)
              );
            });
          })
        );
    } else {
      // Devuelve un Observable vacío cuando useLocation no está definido
      return of([]);
    }
  } */

  getPropertyById(id: number) {
    return this.http
      .get<Property>(`${this.baseUrl}/public-properties/${id}`)
      .pipe(
        map((res) => {
          console.log(res);
          return res;
        })
      );
  }
}
