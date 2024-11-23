import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, catchError, map, tap, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Room } from '../interfaces/room.interface';
import { Amenity } from '../interfaces/amenity.interface';

interface State {
  roomsJWT: Room[];
  loadingJWT: boolean;
}

@Injectable({ providedIn: 'root' })
export class RoomService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;

  #state = signal<State>({
    loadingJWT: true,
    roomsJWT: [],
  });

  // Señales computadas
  public roomsJWT = computed(() => this.#state().roomsJWT);
  public loadingJWT = computed(() => this.#state().loadingJWT);

  constructor() {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getRooms(): Observable<Room[]> {
    return this.http
      .get<Room[]>(`${this.baseUrl}/rooms`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((rooms) => rooms.filter((room) => room.deletedAt === null)), // Filtrar habitaciones
        tap((res) => {
          this.#state.set({
            loadingJWT: false,
            roomsJWT: res,
          });
        }),
        catchError((error) => {
          // Handle error here
          return throwError(error);
        })
      );
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}/rooms/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createRoom(room: Room): Observable<Room> {
    console.log('createRoom');

    return this.http.post<Room>(`${this.baseUrl}/rooms`, room, {
      headers: this.getAuthHeaders(),
    });
  }

  updateRoomJWT(id: number, room: Room): Observable<Room> {
    return this.http.patch<Room>(`${this.baseUrl}/rooms/${id}`, room, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteRoombyIDJWT(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/rooms/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getRoomAmenities(id: number) {
    return this.http.get<Amenity[]>(
      `${this.baseUrl}/public-rooms/${id}/amenities`
    );
  }

  /* softDeleteRoomByIDJWT(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/rooms/${id}`, {
      headers: this.getAuthHeaders(),
    });
  } */
}
