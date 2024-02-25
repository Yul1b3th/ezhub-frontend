import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { Room } from '../interfaces/room.interface';

interface State {
  rooms: Room[];
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class RoomService {
  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;
  private roomAdded = new Subject<Room>();

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

  /* getPublicRooms() {
    return this.http.get<Room[]>(`${this.baseUrl}/public-rooms`);
  } */

  getRooms(): Observable<Room[]> {
    console.log(this.baseUrl);

    return this.http
      .get<Room[]>(`${this.baseUrl}/rooms`)
      .pipe(tap((rooms) => console.log(rooms)));
  }

  /* getRooms(): Observable<Room[]> {
    console.log(this.baseUrl);

    return this.http
      .get<Room[]>(`${this.baseUrl}/rooms`)
      .pipe(tap((rooms) => console.log(rooms)));
  } */

  getAllRooms() {
    debugger;
    this.http.get<Room[]>(`${this.baseUrl}/rooms`).subscribe((res: any) => {
      console.log(res.data);
    });
  }
}
