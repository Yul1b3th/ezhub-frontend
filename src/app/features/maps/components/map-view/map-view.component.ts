import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Map, Popup, Marker } from 'mapbox-gl';

import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
})
export class MapViewComponent implements  AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) {}

  ngAfterViewInit(): void {
    if (!this.placesService.useLocation)
      throw Error('No hay placesService.userLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/light-v10', // style URL
      center: this.placesService.useLocation,
      zoom: 14,
    });

    const popup = new Popup().setHTML(`
        <h6>Aquí estoy</h6>
        <a href="">Enlace</a>
        <span>Estoy en este lugar del mundo</span>
      `);

    const marker = new Marker({ color: 'red' })
      .setLngLat(this.placesService.useLocation)
      .setPopup(popup)
      .addTo(map);
    // Muestra el Popup automáticamente
    marker.togglePopup();

    this.mapService.setMap(map);
  }
}
