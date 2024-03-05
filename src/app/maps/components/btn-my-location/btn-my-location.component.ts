import { Component } from '@angular/core';

import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  standalone: true,
  imports: [],
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.scss',
})
export class BtnMyLocationComponent {
  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) {}

  goToMyLocation() {
    if (!this.placesService.isUserLocationReady)
      throw Error('No hay ubicación del usuario');
    if (!this.mapService.isMapReady) throw Error('No hay mapa disponible');

    console.log('Go to my location');
    this.mapService.flyTo(this.placesService.useLocation!);
  }
}
