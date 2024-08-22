import { EnvironmentInjector, Injectable, computed, inject, runInInjectionContext, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Property } from '../interfaces/property.interface';
import { NotificationService } from '../components/shared/notification/notification.service';
import { toSignal } from '@angular/core/rxjs-interop';

interface State {
  properties: Property[];
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class PublicPropertyService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);

  #state = signal<State>({
    properties: [],
    loading: true,
  });

  // Señales computadas
  public properties = computed(() => this.#state().properties);
  public loading = computed(() => this.#state().loading);

  constructor() {
    this.getPublicPropertiesSignals();
  }

  getPublicPropertiesSignals(): void {
    this.fetchProperties().subscribe(properties => {
      this.updateState(properties);
    });
  }

  private fetchProperties(): Observable<Property[]> {
    return this.http
      .get<Property[]>(`${this.baseUrl}/public-properties`)
      .pipe(
        map(this.filterAvailableProperties.bind(this)),
        tap(properties => this.updateState(properties)),
        catchError(this.handleError.bind(this))
      );
  }

  private filterAvailableProperties(properties: Property[]): Property[] {
    return properties.filter(property => property.deletedAt == null && property.is_available);
  }

  private updateState(properties: Property[]): void {
    this.#state.set({
      ...this.#state(),
      properties: properties,
      loading: false,
    });
  }

  private handleError(error: any): Observable<Property[]> {
    this.notificationService.showNotification(
      'Unable to fetch available properties at this time. Please try again later.', 'error'
    );
    console.error('Error fetching available properties:', error);
    return of([]);
  }

getPropertyById(id: number): Observable<Property | null> {
  return this.http.get<Property>(`${this.baseUrl}/public-properties/${id}`).pipe(
    catchError(error => {
      this.notificationService.showNotification(
        `Error fetching property by ID ${id}: ${error.message}`, 'error'
      );
      return of(null); // Retorna null para indicar que la propiedad no fue encontrada
    })
  );
}


}
