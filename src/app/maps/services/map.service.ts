import { Injectable } from '@angular/core';
import {
  AnySourceData,
  LngLat,
  LngLatBounds,
  LngLatLike,
  Map,
  Marker,
  Popup,
} from 'mapbox-gl';
import { Feature } from '../interfaces/places.interface';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interfaces/directions.interface';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map?: Map;
  private markers: Marker[] = [];

  get isMapReady(): boolean {
    return !!this.map;
  }

  constructor(private diresctionApi: DirectionsApiClient) {}

  // Establecemos el mapa
  setMap(map: Map): void {
    this.map = map;
  }

  // Metodo para mover el mapa
  flyTo(coords: LngLatLike): void {
    if (!this.map) throw Error('No hay mapa');

    this.map.flyTo({
      zoom: 14,
      center: coords,
    });
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {
    if (!this.map) throw Error('No hay mapa');

    // Limpiamos los markers en el mapa, siguen existiendo en el arreglo
    this.markers.forEach((marker) => marker.remove());

    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
      <h6>${place.text}</h6>
      <span> ${place.place_name}</span>
      `);

      const marker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);

      newMarkers.push(marker);
    }

    this.markers = newMarkers;

    if (places.length === 0) return;

    this.markers = newMarkers;

    if (places.length === 0) return;

    // Limites del mapa
    const bounds = new LngLatBounds();
    newMarkers.forEach((marker) => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation);

    this.map.fitBounds(bounds, {
      padding: 200,
    });
  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    this.diresctionApi
      .get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe((resp) => this.drawPolyline(resp.routes[0]));
  }

  private drawPolyline(route: Route) {
    console.log({ Kms: route.distance / 1000, duration: route.duration / 60 });

    if (!this.map) throw Error('No hay mapa');

    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    this.map?.fitBounds(bounds, {
      padding: 200,
    });

    // Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };

    // Todo: Limpiar rutas previas
    if (this.map.getLayer('RoutesString')) {
      this.map.removeLayer('RoutesString');
      this.map.removeSource('RoutesString');
    }

    this.map.addSource('RoutesString', sourceData);

    this.map.addLayer({
      id: 'RoutesString',
      type: 'line',
      source: 'RoutesString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75,
      },
    });
  }
}
