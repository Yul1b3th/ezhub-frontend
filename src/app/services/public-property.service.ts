import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap, toArray } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Property } from '../interfaces/property.interface';
import { PlacesService } from '../maps/services';
import { NotificationService } from '../components/shared/notification/notification.service';
import { Room } from '../interfaces/room.interface';
import { Amenity } from '../interfaces/amenity.interface';

interface State {
  properties: Property[];
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class PublicPropertyService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  #state = signal<State>({
    loading: true,
    properties: [],
  });

  // Señales computadas
  public properties = computed(() => this.#state().properties);
  public loading = computed(() => this.#state().loading);

  constructor(
    private placesService: PlacesService,
    private notificationService: NotificationService
  ) {
    // this.getPublicProperties();
    this.getAllPublicProperties();
    // this.getAllPublicPropertiesWithAmenities();
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

getAllPublicProperties(): void {
  console.log('Fetching public properties...');

  this.http
    .get<Property[]>(`${this.baseUrl}/public-properties`)
    .pipe(
      map((properties) => {
        const filteredProperties = properties
          .filter((property) => property.deletedAt === null)
          .map((property) => ({
            ...property,
            rooms: property.rooms.filter((room) => room.is_available), // Mantén las habitaciones en "rooms"
          }));

        // console.log('Filtered properties with available rooms:', filteredProperties);

        if (filteredProperties.some((property) => property.rooms.length > 0)) {
          this.notificationService.showNotification(
            'Available rooms fetched successfully.',
            'success'
          );
        } else {
          this.notificationService.showNotification(
            'No available rooms found.',
            'info'
          );
        }

        return filteredProperties;
      }),
      tap((properties) => {
        this.#state.set({
          ...this.#state(),
          properties: properties,
          loading: false,
        });
      }),
      catchError((error) => {
        this.notificationService.showNotification(
          'Unable to fetch available properties at this time. Please try again later.',
          'error'
        );
        console.error('Error al obtener habitaciones disponibles:', error);
        return of([]);
      })
    )
    .subscribe();
}

getAllPublicPropertiesWithAmenities(): void {
  console.log('Fetching public properties with amenities...');

  this.http
    .get<Property[]>(`${this.baseUrl}/public-properties`)
    .pipe(
      switchMap((properties) =>
        from(properties).pipe(
          concatMap((property) =>
            from(property.rooms).pipe(
              concatMap((room) =>
                this.http.get<Amenity[]>(`${this.baseUrl}/public-rooms/${room.id}/amenities`).pipe(
                  map((amenities) => ({
                    ...room,
                    amenities,
                  }))
                )
              ),
              toArray(),
              map((rooms) => ({
                ...property,
                rooms,
              }))
            )
          ),
          toArray()
        )
      ),
      tap((properties) => {
        console.log('Properties with rooms and amenities:', properties);
        this.#state.set({
          ...this.#state(),
          properties,
          loading: false,
        });
      }),
      catchError((error) => {
        this.notificationService.showNotification(
          'Unable to fetch available properties at this time. Please try again later.',
          'error'
        );
        console.error('Error fetching properties:', error);
        return of([]);
      })
    )
    .subscribe();
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
