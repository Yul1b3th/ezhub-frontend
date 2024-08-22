import { Injectable, inject, signal, computed, effect, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, tap, mergeMap, map, toArray } from 'rxjs/operators';

import { Amenity } from '../interfaces/amenity.interface';
import { Room } from '../interfaces/room.interface';
import { NotificationService } from '../components/shared/notification/notification.service';
import { PublicRoomService } from './public-room.service';
import { environment } from '../../environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';
import { NotificationAmenityService } from '../components/shared/notificationAmenity/notificationAmenity.service';

interface State {
  amenities: Amenity[];
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class AmenityService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private notificationAmenityService = inject(NotificationAmenityService);
  private publicRoomService = inject(PublicRoomService);
  private readonly _injector = inject(EnvironmentInjector);

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
      catchError(error => this.handleError(error))
    );
  }


}
