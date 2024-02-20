import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Property } from '../interfaces/property.interface';

interface State {
  properties: Property[];
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class PublicRoomService {
  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;

  #state = signal<State>({
    loading: true,
    properties: [],
  });

  // Señales computadas
  public properties = computed(() => this.#state().properties);
  public loading = computed(() => this.#state().loading);

  constructor() {
    this.getPublicProperties();
  }

  getPublicProperties(): void {
    this.http
      .get<Property[]>(`${this.baseUrl}/public-properties`)
      .subscribe((res) => {
        this.#state.set({
          loading: false,
          properties: res,
        });
        console.log(res);
      });
    console.log('Cargando data');
  }
}
