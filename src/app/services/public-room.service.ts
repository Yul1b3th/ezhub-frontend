import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { catchError, mergeMap, tap, toArray } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Property } from '../interfaces/property.interface';
import { PlacesService } from '../maps/services';
import { NotificationService } from '../components/shared/notification/notification.service';
import { Room } from '../interfaces/room.interface';
import { PublicPropertyService } from './public-property.service';
import { QueryStateService } from '../components/search-bar/query-state.service';


interface State {
  rooms: Room[];
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class PublicRoomService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);
  private publicPropertyService = inject(PublicPropertyService);
  private placesService = inject(PlacesService);
  private queryStateService = inject(QueryStateService);

  #state = signal<State>({
    rooms: [],
    loading: true,

  });

  public rooms = computed(() => this.#state().rooms);
  public loading = computed(() => this.#state().loading);
  public query = computed(() => this.queryStateService.getQuery()());
  public getstateRoomId = computed(() => this.stateRoomId());

  public stateRoomId = signal<boolean>(false);

  constructor() {
    effect(() => {
      const properties: Property[] = this.publicPropertyService.properties();
      const query = this.queryStateService.getQuery()();
      this.extractRooms(properties, query);
      this.queryRooms(query);
    }, { allowSignalWrites: true });
  }

getRoomById(id: number): Observable<Room | null> {
  return this.http.get<Room>(`${this.baseUrl}/public-rooms/${id}`).pipe(
    tap(() => {
            this.stateRoomId.set(true );
      }),
    catchError(error => {
      this.notificationService.showNotification(
        `Error fetching room by ID ${id}: ${error.message}`, 'error'
      );
      this.stateRoomId.set( false );
      return of(null);
    })
  );
}


  queryRooms(query: string = '') {
    this.queryStateService.setQuery(query);
    this.extractRooms(this.publicPropertyService.properties(), query);
  }

  private extractRooms(properties: Property[], query: string = ''): void {
    const rooms = query ? this.getRoomsByQuery(properties, query) : this.getRoomsByLocation(properties);
    from(rooms).pipe(
      mergeMap(room => this.populateRoomProperty(room, properties), 2),
      toArray()
    ).subscribe({
      next: () => this.updateState(rooms),
      error: (error) => {
        console.error('Error extracting rooms:', error);
        this.notificationService.showNotification('Error extracting rooms', 'error');
        this.updateState([]);
      }
    });
    if (rooms.length === 0) {
      this.updateState([]);
    }
  }

  private updateState(rooms: Room[]): void {
    this.#state.set({ rooms, loading: false });
  }

  private populateRoomProperty(room: Room, properties: Property[]): Observable<void> {
    const property = properties.find(p => p.id === room.propertyId);
    if (property) {
      room.property = property;
    }
    return of(undefined);
  }

  private getRoomsByQuery(properties: Property[], query: string): Room[] {
    const filteredProperties = this.filterPropertiesByQuery(properties, query);
    return this.getAvailableRoomsFromProperties(filteredProperties);
  }

  private getRoomsByLocation(properties: Property[]): Room[] {
    return this.isUserLocationReady() ? this.getNearbyAvailableRooms(properties) : this.getAvailableRoomsFromProperties(properties);
  }

  private filterPropertiesByQuery(properties: Property[], query: string): Property[] {
    return properties.filter((property: Property) =>
      property.postalCode === query || property.city.toLowerCase().includes(query.toLowerCase())
    );
  }

  private getAvailableRoomsFromProperties(properties: Property[]): Room[] {
    return properties.flatMap((property: Property) =>
      property.rooms.filter((room: Room) => room.deletedAt == null && room.is_available)
    );
  }

  private getNearbyAvailableRooms(properties: Property[]): Room[] {
    const userLocation = this.placesService.useLocation;
    if (!userLocation) return [];

    const [userLongitude, userLatitude] = userLocation;
    const nearbyProperties = properties.filter((property: Property) => {
      const distance = this.placesService.calculateDistance(
        userLongitude, userLatitude, Number(property.longitude), Number(property.latitude)
      );
      return distance <= this.placesService.maxDistance;
    });

    return this.getAvailableRoomsFromProperties(nearbyProperties);
  }

  private isUserLocationReady(): boolean {
    return !(this.placesService.userDeniedLocation && !this.placesService.isUserLocationReady);
  }



}
