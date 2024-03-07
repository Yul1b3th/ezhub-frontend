import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, map } from 'rxjs';

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

  constructor() {
    this.getProperties();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getProperties(): void {
    this.http
      .get<Property[]>(`${this.baseUrl}/properties`, {
        headers: this.getAuthHeaders(),
      })
      .subscribe((res) => {
        this.#state.set({
          loadingJWT: false,
          propertiesJWT: res,
        });
        console.log(res);
      });
    console.log('Cargando data');
  }

  getPropertyById(id: number) {
    return this.http
      .get<Property>(`${this.baseUrl}/properties/${id}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((res) => {
          console.log(res);
          return res;
        })
      );
  }

  createProperty(property: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/properties`, property, {
      headers: this.getAuthHeaders(),
    });
  }

  updatePropertyJWT(id: number, property: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/properties/${id}`, property, {
      headers: this.getAuthHeaders(),
    });
  }

  deletePropertybyIDJWT(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/properties/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
