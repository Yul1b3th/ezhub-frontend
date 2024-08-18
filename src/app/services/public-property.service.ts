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
  rooms: Room[];
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class PublicPropertyService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  #state = signal<State>({
    properties: [],
    rooms: [],
    loading: true,
  });

  // Señales computadas
  public properties = computed(() => this.#state().properties);
  public rooms = computed(() => this.#state().rooms);
  public loading = computed(() => this.#state().loading);

  constructor(
    private placesService: PlacesService,
    private notificationService: NotificationService
  ) {
    this.getPublicPropertiesSignals();
  }

  getPublicPropertiesSignals(): void {
    console.log('Fetching public properties...');
    this.fetchProperties().subscribe(properties => {
      const rooms: Room[] = this.extractRooms(properties);
      this.updateState(properties, rooms);
    });
  }

  private fetchProperties(): Observable<Property[]> {
    return this.http
      .get<Property[]>(`${this.baseUrl}/public-properties`)
      .pipe(
        map(this.filterAvailableProperties.bind(this)),
        tap(properties => this.updateState(properties, this.extractRooms(properties))),
        catchError(this.handleError.bind(this))
      );
  }

  private filterAvailableProperties(properties: Property[]): Property[] {
    return properties.filter(property => property.deletedAt == null && property.is_available);
  }

  private updateState(properties: Property[], rooms: Room[]): void {
    console.log('Updating state with properties:', properties);
    this.#state.set({
      ...this.#state(),
      properties: properties,
      rooms: rooms,
      loading: false,
    });
  }

  private extractRooms(properties: Property[]): Room[] {
    const rooms: Room[] = [];
    properties.forEach(property => {
      console.log('Property:', property.id, '-', property.rooms);
      property.rooms.forEach((room: Room) => {
        if (room.deletedAt == null && room.is_available) {
          rooms.push(room);
        }
      });
    });
    return rooms;
  }

  private handleError(error: any): Observable<Property[]> {
    this.notificationService.showNotification(
      'Unable to fetch available properties at this time. Please try again later.', 'error'
    );
    console.error('Error fetching available properties:', error);
    return of([]);
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
