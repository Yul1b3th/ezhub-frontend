import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, map, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { Room } from '../interfaces/room.interface';

interface State {
  roomsJWT: Room[];
  loadingJWT: boolean;
}

@Injectable({ providedIn: 'root' })
export class RoomService {
  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;

  #state = signal<State>({
    loadingJWT: true,
    roomsJWT: [],
  });

  // Señales computadas
  public roomsJWT = computed(() => this.#state().roomsJWT);
  public loadingJWT = computed(() => this.#state().loadingJWT);

  constructor() {
    this.getRooms();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getRooms(): void {
    this.http
      .get<Room[]>(`${this.baseUrl}/rooms`, {
        headers: this.getAuthHeaders(),
      })
      .subscribe((res) => {
        this.#state.set({
          loadingJWT: false,
          roomsJWT: res,
        });
        console.log(res);
      });
    console.log('Cargando data');
  }

  getRoomById(id: number) {
    return this.http
      .get<Room>(`${this.baseUrl}/rooms/${id}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((res) => {
          console.log(res);
          return res;
        })
      );
  }

  createRoom(room: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/rooms`, room, {
      headers: this.getAuthHeaders(),
    });
  }

  updateRoomJWT(id: number, room: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/rooms/${id}`, room, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteRoombyIDJWT(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/rooms/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
