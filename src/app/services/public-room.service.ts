import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { Room } from '../interfaces/room.interface';
import { Amenity } from '../interfaces/amenity.interface';
import { PlacesService } from '../maps/services';
import { PublicPropertyService } from './public-property.service';
import { Property } from '../interfaces/property.interface';
import { NotificationService } from '../components/shared/notification/notification.service';

interface State {
  rooms: Room[];
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class PublicRoomService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private publicPropertyService = inject(PublicPropertyService);
  private notificationService = inject(NotificationService);
  private placesService = inject(PlacesService);

  #state = signal<State>({
    loading: true,
    rooms: [],
  });

  // Señales computadas
  public rooms = computed(() => this.#state().rooms);
  public loading = computed(() => this.#state().loading);

  constructor() {
    // this.getPublicRooms();
    // this.filterRooms();
    this.filterRoomsSignal();
  }

  getRoomById(id: number) {
    return this.http.get<Room>(`${this.baseUrl}/public-rooms/${id}`).pipe(
      map((res) => {
        //console.log(res);
        return res;
      })
    );
  }

  getRoomAmenities(id: number) {
    return this.http.get<Amenity[]>(
      `${this.baseUrl}/public-rooms/${id}/amenities`
    );
  }

  filterRooms(query: string = '') {
    // Filtra las habitaciones basándose en la consulta y la geolocalización
    this.publicPropertyService
      .getPublicProperties()
      .subscribe((properties: Property[]) => {
        let filteredRooms: Room[] = [];
        properties.forEach((property: Property) => {
          let userLongitude: number = 0;
          let userLatitude: number = 0;

          if (this.placesService.useLocation) {
            [userLongitude, userLatitude] = this.placesService.useLocation;
          }
          if (userLongitude !== 0 && userLatitude !== 0 && !query) {
            if (
              this.placesService.calculateDistance(
                userLongitude,
                userLatitude,
                Number(property.longitude),
                Number(property.latitude)
              )
            ) {
              const validRooms = property.rooms.filter(
                (room) => room.deletedAt === null && room.is_available
              );
              filteredRooms = filteredRooms.concat(validRooms);
            }
          }
          if (query) {
            if (property.city.toLowerCase().includes(query.toLowerCase())) {
              const validRooms = property.rooms.filter(
                (room) => room.deletedAt === null && room.is_available
              );
              filteredRooms = filteredRooms.concat(validRooms);
            }
            if (property.postalCode.includes(query)) {
              const validRooms = property.rooms.filter(
                (room) => room.deletedAt === null && room.is_available
              );
              filteredRooms = filteredRooms.concat(validRooms);
            }
          }
          if (!this.placesService.useLocation && !query) {
            const validRooms = property.rooms.filter(
              (room) => room.deletedAt === null && room.is_available
            );
            filteredRooms = filteredRooms.concat(validRooms);
          }
        });
        console.log(filteredRooms);

        this.#state.set({
          loading: false,
          rooms: filteredRooms,
        });
      });
  }


filterRoomsSignal(query: string = ''): void {
    console.log('Fetching Rooms...');
    this.http.get<Room[]>(`${this.baseUrl}/public-rooms`)
      .pipe(
        map(this.filterAvailableRooms),
        tap(this.updateState.bind(this)),
        catchError(this.handleError.bind(this))
      )
      .subscribe();
}

private filterAvailableRooms(rooms: Room[]): Room[] {
    rooms.forEach(room => {
        // console.log(`Room ID: ${room.id}, is_available: ${room.is_available}, deletedAt: ${room.deletedAt}`);
    });
    return rooms.filter(room => room.deletedAt == null && room.is_available);
}

private updateState(rooms: Room[]): void {
    this.#state.set({
        ...this.#state(),
        rooms: rooms,
        loading: false,
    });
}

private handleError(error: any): Observable<Room[]> {
    this.notificationService.showNotification(
        'Unable to fetch available properties at this time. Please try again later.',
        'error'
    );
    console.error('Error al obtener habitaciones disponibles:', error);
    return of([]);
}


}
