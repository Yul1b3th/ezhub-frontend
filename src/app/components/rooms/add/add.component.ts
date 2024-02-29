import { Component, computed, inject } from '@angular/core';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export default class AddComponent {
  private authService = inject(AuthService);

  // Con las propiedades computadas es una forma sencilla de tener propiedades de solo lectura
  public user = computed(() => this.authService.currentUser());
}
