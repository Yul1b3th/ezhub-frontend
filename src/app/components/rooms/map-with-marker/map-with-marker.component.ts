import { AfterViewInit, Component, ElementRef, ViewChild, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Map, Marker, LngLat, LngLatBounds } from 'mapbox-gl';

import { NotificationService } from '../../shared/notification/notification.service';
import { PublicRoomService } from '../../../services/public-room.service';
import { Room } from '../../../interfaces/room.interface';


@Component({
  selector: 'map-with-marker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-with-marker.component.html',
  styleUrls: ['./map-with-marker.component.scss'],
})
export default class MapWithMarkerComponent implements AfterViewInit {

  private markers: Marker[] = [];

  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;
  public lngLat: [number, number] = [2.187975058256683, 41.392281189125214];

  notification = inject(NotificationService);
  publicRoomService = inject(PublicRoomService);

  constructor() {
    effect(() => {
      const rooms = this.publicRoomService.rooms();
      const uniqueProperties = this.getUniqueProperties(rooms);

      if (this.map) {
        // Elimina los marcadores existentes
        this.markers.forEach((marker) => marker.remove());
        this.markers = [];

        // Añade los nuevos marcadores
        this.addMarkers(uniqueProperties);
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('El elemento HTML no fue encontrado');
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 13,
    });
  }

  private getUniqueProperties(rooms: Room[]): { [key: string]: Room } {
    const propertyMap: { [key: string]: Room } = {};

    rooms.forEach(room => {
const propertyId = room.property?.id;
if (propertyId && !propertyMap[propertyId]) {
  propertyMap[propertyId] = room;
}

    });

    return propertyMap;
  }

private addMarkers(properties: { [key: string]: Room }): void {
  const bounds = new LngLatBounds();

  Object.values(properties).forEach((room: Room) => {
    const property = room.property;

    if (!property) return; // Si 'property' es undefined, salta a la siguiente iteración

    const lngLat: LngLat = new LngLat(
      parseFloat(property.longitude),
      parseFloat(property.latitude)
    );

    // Añadir las coordenadas al objeto bounds
    bounds.extend(lngLat);

    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';

    const propertyInfo = document.createElement('div');
    propertyInfo.innerHTML = `
      <div>
        <strong><a href="/property-details/${property.id}">${property.name}</a></strong><br>
        Habitaciones disponibles: ${property.rooms?.length ?? 0}
      </div>
    `;
    markerElement.appendChild(propertyInfo);

    const marker = new Marker({ color: '#30daa6' })
      .setLngLat(lngLat)
      .addTo(this.map!);
    this.markers.push(marker);
  });

  if (this.markers.length === 1) {
    // Si hay un solo marcador, establecemos un zoom fijo, por ejemplo 12
    this.map!.setZoom(12);
    this.map!.setCenter(bounds.getCenter()); // Centra el mapa en el único marcador
  } else if (this.markers.length > 1) {
    // Si hay más de un marcador, ajusta el zoom y el centro del mapa a los bounds
    this.map!.fitBounds(bounds, { padding: 50, maxZoom: 12 }); // Ajusta el padding y el maxZoom según sea necesario
  } else {
    // Si no hay marcadores o si quieres mostrar un zoom predeterminado
    this.map!.setZoom(5); // Zoom para mostrar toda España
    this.map!.setCenter([-3.703790, 40.416775]); // Centro en España (Madrid)
  }
}


}
