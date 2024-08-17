import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Property } from '../interfaces/property.interface';
import { PlacesService } from '../maps/services';
import { NotificationService } from '../components/shared/notification/notification.service';
import { Room } from '../interfaces/room.interface';

interface State {
  rooms: Property[];
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class PublicPropertyService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  #state = signal<State>({
    loading: true,
    rooms: [],
  });

  // Señales computadas
  public rooms = computed(() => this.#state().rooms);
  public loading = computed(() => this.#state().loading);

  constructor(
    private placesService: PlacesService,
    private notificationService: NotificationService
  ) {
    // this.getPublicProperties();
  }

getPublicProperties(): Observable<Property[]> {
  return this.http
    .get<Property[]>(`${this.baseUrl}/public-properties`)
    .pipe(
      map((properties) => {
        const filteredProperties = properties.filter((property) => property.deletedAt === null);
        // Mostrar notificación de éxito si se obtienen propiedades
        console.log(filteredProperties);

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

  getAllPublicProperties(): void{
    this.http
      .get<Property[]>(`${this.baseUrl}/public-properties`)
      .pipe(
        map((properties) => {
          const filteredProperties = properties.filter((property) => property.deletedAt === null);
          // Mostrar notificación de éxito si se obtienen propiedades
          console.log(filteredProperties);

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
        this.#state.set({
          loading: false,
          rooms: filteredProperties,
        });
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

