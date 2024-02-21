import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Room } from '../interfaces/room.interface';
import { Observable, map } from 'rxjs';
import { Amenity } from '../interfaces/amenity.interface';

interface State {
  rooms: Room[];
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class PublicRoomService {
  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;

  #state = signal<State>({
    loading: true,
    rooms: [],
  });

  // Señales computadas
  public rooms = computed(() => this.#state().rooms);
  public loading = computed(() => this.#state().loading);

  constructor() {
    this.getPublicRooms();
  }

  getPublicRooms(): void {
    this.http.get<Room[]>(`${this.baseUrl}/public-rooms`).subscribe((res) => {
      this.#state.set({
        loading: false,
        rooms: res,
      });
      console.log(res);
    });
    console.log('Cargando data');
  }

  getRoomById(id: number) {
    return this.http.get<Room>(`${this.baseUrl}/public-rooms/${id}`).pipe(
      map((res) => {
        console.log(res);
        return res;
      })
    );
  }

  getRoomAmenities(id: number) {
    return this.http.get<Amenity[]>(
      `${this.baseUrl}/public-rooms/${id}/amenities`
    );
  }
}
