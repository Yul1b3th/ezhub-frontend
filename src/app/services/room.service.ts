import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { Room } from '../interfaces/room.interface';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private readonly baseUrl: string = environment.baseUrl;
  private roomAdded = new Subject<Room>();

  private http = inject(HttpClient);

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
