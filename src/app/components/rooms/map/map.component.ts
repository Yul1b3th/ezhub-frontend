import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export default class MapComponent implements AfterViewInit, OnInit {
  @ViewChild('map') divMap?: ElementRef;
  public apiUrl = 'http://localhost:8000/api/public-properties/';
  public properties: any[] = [];

  public map?: Map;
  public lngLat: [number, number] = [2.187975058256683, 41.392281189125214];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.properties = data;
      this.properties.forEach((property) => {
        const markerElement = document.createElement('div');
        markerElement.className = 'marker';
        markerElement.textContent = property.name;
        this.lngLat = [
          parseFloat(property.longitude),
          parseFloat(property.latitude),
        ];
      });
    });
  }

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';
    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 13,
    });

    console.log(this.lngLat);

    // new Marker().setLngLat(this.lngLat).addTo(this.map);
    this.map.on('load', () => {
      this.addMarkers();
    });
  }

  addMarkers(): void {
    this.properties.forEach((property) => {
      let availableRooms = 0;
      let totalPrice = 0;

      property.rooms.forEach((room: any) => {
        if (room.is_available) {
          availableRooms++;
        }
        totalPrice += parseFloat(room.precio);
      });

      // Codigo para añadir un div con un enlace a la propiedad
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';

      // Agregar el nombre de la propiedad y habitaciones disponibles
      const propertyInfo = document.createElement('div');
      propertyInfo.innerHTML = `
      <div>
        <strong><a href="/property-details/${property.id}">${property.name}</a></strong><br>
        Habitaciones disponibles: ${availableRooms}
      </div>
    `;
      markerElement.appendChild(propertyInfo);

      const lngLat: LngLat = new LngLat(
        parseFloat(property.longitude),
        parseFloat(property.latitude)
      );

      new Marker().setLngLat(lngLat).addTo(this.map!);
    });
  }
}
