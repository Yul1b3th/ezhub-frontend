import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Property } from '../interfaces/property.interface';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { PlacesService } from '../maps/services';

@Injectable({ providedIn: 'root' })
export class PublicPropertyService {
  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private placesService: PlacesService) {
    this.getPublicProperties();
    //this.getPublicProperties(query);
    //this.filterProperties();
  }

  getPublicProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}/public-properties`);
  }
  /*   getPublicPropertiesQuery(query: string): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}/public-properties`);
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

  /*   filterProperties(query: string = ''): Observable<Property[]> {
    console.log(query);

    return this.getPublicPropertiesQuery(query).pipe(
      tap((properties) => console.log('Fetched properties', properties)),
      catchError((error) => {
        console.error('Error fetching properties', error);
        return throwError(error);
      }),
      map((properties: Property[]) => {
        let filteredProperties: Property[] = [];
        console.log(properties);
        console.log(query);

        properties.forEach((property: Property) => {
          let userLongitude: number = 0;
          let userLatitude: number = 0;
          console.log(query);
          if (this.placesService.useLocation) {
            [userLongitude, userLatitude] = this.placesService.useLocation;
          }

          if (userLongitude !== 0 && userLatitude !== 0) {
            if (
              this.placesService.calculateDistance(
                userLongitude,
                userLatitude,
                Number(property.longitude),
                Number(property.latitude)
              )
            ) {
              filteredProperties.push(property);
            }
          }

          if (query) {
            console.log(query);
            if (
              property.city.toLowerCase().includes(query.toLowerCase()) ||
              property.postalCode.includes(query)
            ) {
              filteredProperties.push(property);
            }
          }

          if (!this.placesService.useLocation && !query) {
            filteredProperties.push(property);
          }
        });

        console.log(filteredProperties);

        return filteredProperties;
      })
    );
  } */
}
