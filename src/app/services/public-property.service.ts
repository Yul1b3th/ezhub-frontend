import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Property } from '../interfaces/property.interface';
import { PlacesService } from '../maps/services';
import { NotificationService } from '../components/shared/notification/notification.service';

@Injectable({ providedIn: 'root' })
export class PublicPropertyService {
  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;

  constructor(
    private placesService: PlacesService,
    private notificationService: NotificationService
  ) {
    this.getPublicProperties();
  }

getPublicProperties(): Observable<Property[]> {
  return this.http
    .get<Property[]>(`${this.baseUrl}/public-properties`)
    .pipe(
      map((properties) => {
        const filteredProperties = properties.filter((property) => property.deletedAt === null);
        // Mostrar notificación de éxito si se obtienen propiedades
        if (filteredProperties.length > 0) {
          this.notificationService.showNotification(
            'Public properties fetched successfully.',
            'success'
          );
        } else {
          this.notificationService.showNotification(
            'No public properties found.',
            'info'
          );
        }
        return filteredProperties;
      }),
      catchError((error) => {
        // Mostrar notificación de error personalizada
        this.notificationService.showNotification(
          'Unable to fetch public properties at this time. Please try again later.',
          'error'
        );
        console.error('Error al obtener propiedades públicas:', error);
        return of([]);
      })
    );
}

  getPropertyById(id: number) {
    return this.http
      .get<Property>(`${this.baseUrl}/public-properties/${id}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}

