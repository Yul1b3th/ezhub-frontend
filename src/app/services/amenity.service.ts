import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { catchError, tap, mergeMap, map, toArray } from 'rxjs/operators';

import { Amenity } from '../interfaces/amenity.interface';
import { Room } from '../interfaces/room.interface';
import { NotificationService } from '../components/shared/notification/notification.service';
import { PublicRoomService } from './public-room.service';
import { environment } from '../../environments/environment';

interface State {
  amenities: Amenity[];
  loading: boolean;
  roomAmenities: Room[];
}

@Injectable({ providedIn: 'root' })
export class AmenityService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);
  private publicRoomService = inject(PublicRoomService);

  #state = signal<State>({
    amenities: [],
    loading: true,
    roomAmenities: [],
  });

  public amenities = computed(() => this.#state().amenities);
  public loading = computed(() => this.#state().loading);
  public roomAmenities = computed(() => this.#state().roomAmenities);




  private updateAmenitiesState(amenities: Amenity[]): void {
    this.#state.set({
      ...this.#state(),
      amenities: amenities,
      loading: false,
    });
  }


  private handleError(error: any): Observable<Amenity[]> {
    this.notificationService.showNotification(
      'Unable to fetch amenities at this time. Please try again later.', 'error'
    );
    console.error('Error fetching amenities:', error);
    return of([]);
  }

  getAmenitiesById (id: string) {
    return this.http.get<Amenity[]>(`${this.baseUrl}/public-rooms/${id}/amenities`)
      .pipe(
        catchError(error => {
          this.notificationService.showNotification(`Error fetching amenities for room ID ${id}: ${error.message}`, 'error');
          console.error(`Error fetching amenities for room ID ${id}:`, error);
          return of([]);
        })
    );
  }
}
