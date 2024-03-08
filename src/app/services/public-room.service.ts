import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Room } from '../interfaces/room.interface';
import { Observable, map } from 'rxjs';
import { Amenity } from '../interfaces/amenity.interface';
import { PlacesService } from '../maps/services';
import { PublicPropertyService } from './public-property.service';
import { Property } from '../interfaces/property.interface';
import { query } from '@angular/animations';

interface State {
  rooms: Room[];
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class PublicRoomService {
  private http = inject(HttpClient);
  private publicPropertyService = inject(PublicPropertyService);
  private readonly baseUrl: string = environment.baseUrl;

  #state = signal<State>({
    loading: true,
    rooms: [],
  });

  // Señales computadas
  public rooms = computed(() => this.#state().rooms);
  public loading = computed(() => this.#state().loading);

  constructor(private placesService: PlacesService) {
    this.filterRooms();
  }

  getPublicRooms(): void {
    this.publicPropertyService
      .getPublicProperties()
      .subscribe((properties: Property[]) => {
        let rooms: Room[] = [];
        properties.forEach((property: Property) => {
          rooms = rooms.concat(property.rooms);
        });
        this.#state.set({
          loading: false,
          rooms: rooms,
        });
      });
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

  searchRooms(query: string) {
    this.http
      .get<Room[]>(`${this.baseUrl}/public-rooms`, {
        params: {
          query: query,
        },
      })
      .subscribe((res) => {
        this.#state.set({
          loading: false,
          rooms: res,
        });
      });
  }
  filterRooms(query: string = '') {
    //console.log('filterRooms');

    // Filtra las habitaciones basándose en la consulta y la geolocalización
    this.publicPropertyService
      .getPublicProperties()
      .subscribe((properties: Property[]) => {
        let filteredRooms: Room[] = [];
        properties.forEach((property: Property) => {
          let userLongitude: number = 0;
          let userLatitude: number = 0;
          //console.log(this.placesService.useLocation);

          if (this.placesService.useLocation) {
            [userLongitude, userLatitude] = this.placesService.useLocation;
          }
          if (userLongitude !== 0 && userLatitude !== 0 && !query) {
            //console.log('useLocation');
            if (
              this.placesService.calculateDistance(
                userLongitude,
                userLatitude,
                Number(property.longitude),
                Number(property.latitude)
              )
            ) {
              filteredRooms = filteredRooms.concat(property.rooms);
            }
          }
          if (query) {
            //console.log(query);

            if (property.city.toLowerCase().includes(query.toLowerCase())) {
              filteredRooms = filteredRooms.concat(property.rooms);
            }
            if (property.postalCode.includes(query)) {
              filteredRooms = filteredRooms.concat(property.rooms);
            }
          }
          if (!this.placesService.useLocation && !query) {
            //console.log('!this.placesService.useLocation');
            filteredRooms = filteredRooms.concat(property.rooms);
          }
        });

        //console.log({ filteredRooms });

        this.#state.set({
          loading: false,
          rooms: filteredRooms,
        });
      });
  }
}
