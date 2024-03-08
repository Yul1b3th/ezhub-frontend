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
  }

  getPublicProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}/public-properties`);
  }

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
