import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Amenity } from '../interfaces/amenity.interface';
import { PublicRoomService } from './public-room.service';
import { environment } from '../../environments/environment';
import { NotificationAmenityService } from '../components/shared/notificationAmenity/notificationAmenity.service';

interface State {
  amenities: Amenity[];
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class AmenityService {
  private readonly baseUrl: string = environment.baseUrl;
  private readonly http = inject(HttpClient);
  private readonly notificationAmenityService = inject(NotificationAmenityService);
  private readonly publicRoomService = inject(PublicRoomService);

  #state = signal<State>({
    amenities: [],
    loading: true,
  });

  public amenities = computed(() => this.#state().amenities);
  public loading = computed(() => this.#state().loading);

  private updateAmenitiesState(amenities: Amenity[]): void {
    this.#state.set({
      ...this.#state(),
      amenities: amenities,
      loading: false,
    });
  }

  private handleError(error: any): Observable<Amenity[]> {
    this.notificationAmenityService.showNotification(
      'Unable to fetch amenities at this time. Please try again later.', 'error'
    );
    console.error('Error fetching amenities:', error);
    return of([]);
  }

  getAmenitiesById(id: string): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(`${this.baseUrl}/public-rooms/${id}/amenities`).pipe(
      catchError(error => {
        this.handleError(error);
        return of([]);
      })
    );
  }
}
