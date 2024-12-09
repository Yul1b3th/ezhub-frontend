import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, catchError, map, tap, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Property } from '../interfaces/property.interface';

interface State {
  propertiesJWT: Property[];
  loadingJWT: boolean;
}

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;

  #state = signal<State>({
    loadingJWT: true,
    propertiesJWT: [],
  });

  // Señales computadas
  public propertiesJWT = computed(() => this.#state().propertiesJWT);
  public loadingJWT = computed(() => this.#state().loadingJWT);

  constructor() {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getProperties(): Observable<Property[]> {
    return this.http
      .get<Property[]>(`${this.baseUrl}/properties`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((properties) =>
          properties.filter((property) => property.deletedAt === null)
        ),
        tap((res) => {
          this.#state.set({
            loadingJWT: false,
            propertiesJWT: res,
          });
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getPropertyById(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.baseUrl}/properties/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(`${this.baseUrl}/properties`, property, {
      headers: this.getAuthHeaders(),
    });
  }

  updatePropertyJWT(id: number, property: Property): Observable<Property> {
    return this.http.patch<Property>(
      `${this.baseUrl}/properties/${id}`,
      property,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  deletePropertybyIDJWT(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/properties/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
