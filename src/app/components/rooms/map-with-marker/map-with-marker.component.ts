import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, computed, inject, signal} from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl';

import { PublicPropertyService } from '../../../services/public-property.service';
import { Property } from '../../../interfaces/property.interface';
import { environment } from '../../../../environments/environment';
import { PlacesService } from '../../../maps/services';
import { QueryService } from '../../../services/query.service';

interface State {
  properties: Property[];
  loading: boolean;
}

@Component({
  selector: 'map-with-marker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-with-marker.component.html',
  styleUrls: ['./map-with-marker.component.scss'],
})
  export default class MapWithMarkerComponent{}
// export default class MapWithMarkerComponent implements AfterViewInit, OnInit {
//   private http = inject(HttpClient);
//   private readonly baseUrl: string = environment.baseUrl;
//   private markers: Marker[] = [];

//   @ViewChild('map') divMap?: ElementRef;

//   public map?: Map;
//   public lngLat: [number, number] = [2.187975058256683, 41.392281189125214];

//   stateSignal = signal<State>({
//     loading: true,
//     properties: [],
//   });

//   // Señales computadas
//   public properties = computed(() => this.stateSignal().properties);
//   public loading = computed(() => this.stateSignal().loading);

//   constructor(
//     private publicPropertyService: PublicPropertyService,
//     private placesService: PlacesService,
//     private queryService: QueryService
//   ) {}

//   ngOnInit(): void {
//     this.queryService.query$.subscribe((query) => {
//       this.filterProperties(query);
//     });
//   }

//   ngAfterViewInit(): void {
//     if (!this.divMap) throw 'El elemento HTML no fue encontrado';
//     this.map = new Map({
//       container: this.divMap?.nativeElement,
//       style: 'mapbox://styles/mapbox/streets-v12',
//       center: this.lngLat,
//       zoom: 13,
//     });

//     //console.log(this.lngLat);
//   }

//   filterProperties(query: string = '') {
//     //console.log('filterProperties');

//     // Filtra las propiedades basándose en la consulta y la geolocalización
//     this.publicPropertyService
//       .getPublicProperties()
//       .subscribe((properties: Property[]) => {
//         let filteredProperties: Property[] = [];
//         //console.log(properties);

//         properties.forEach((property: Property) => {
//           let userLongitude: number = 0;
//           let userLatitude: number = 0;
//           //console.log(this.placesService.useLocation);

//           if (this.placesService.useLocation) {
//             //console.log('this.placesService.useLocation');

//             [userLongitude, userLatitude] = this.placesService.useLocation;
//           }
//           if (userLongitude !== 0 && userLatitude !== 0 && !query) {
//             //console.log('useLocation');
//             //console.log();

//             if (
//               this.placesService.calculateDistance(
//                 userLongitude,
//                 userLatitude,
//                 Number(property.longitude),
//                 Number(property.latitude)
//               )
//             ) {
//               filteredProperties.push(property);
//               //console.log('useLocation', filteredProperties);
//             }
//           }
//           if (query) {
//             //console.log(query);
//             if (property.city.toLowerCase().includes(query.toLowerCase())) {
//               filteredProperties.push(property);
//             }
//             if (property.postalCode.includes(query)) {
//               filteredProperties.push(property);
//             }
//           }
//           if (!this.placesService.useLocation && !query) {
//             //console.log('!this.placesService.useLocation');
//             filteredProperties.push(property);
//           }
//         });

//         //console.log({ filteredProperties });

//         this.stateSignal.set({
//           loading: false,
//           properties: filteredProperties,
//         });
//         if (this.map) {
//           // Elimina los marcadores existentes
//           this.markers.forEach((marker) => marker.remove());
//           this.markers = [];

//           // Añade los nuevos marcadores y guarda una referencia a ellos
//           this.addMarkers(filteredProperties);

//           // Centra el mapa en los nuevos marcadores
//           if (filteredProperties.length > 0) {
//             const lngs = filteredProperties.map((p) => parseFloat(p.longitude));
//             const lats = filteredProperties.map((p) => parseFloat(p.latitude));
//             const centerLng = lngs.reduce((a, b) => a + b) / lngs.length;
//             const centerLat = lats.reduce((a, b) => a + b) / lats.length;
//             this.map.setCenter([centerLng, centerLat]);
//           }
//         }
//       });
//   }

//   addMarkers(properties: Property[]): void {
//     properties.forEach((property) => {
//       const markerElement = document.createElement('div');
//       markerElement.className = 'custom-marker';

//       const propertyInfo = document.createElement('div');
//       propertyInfo.innerHTML = `
//       <div>
//         <strong><a href="/property-details/${property.id}">${
//         property.name
//       }</a></strong><br>
//         Habitaciones disponibles: ${
//           property.rooms.filter((room) => room.is_available).length
//         }
//       </div>
//     `;
//       markerElement.appendChild(propertyInfo);

//       const lngLat: LngLat = new LngLat(
//         parseFloat(property.longitude),
//         parseFloat(property.latitude)
//       );

//       const marker = new Marker({ color: '#30daa6' })
//         .setLngLat(lngLat)
//         .addTo(this.map!);
//       this.markers.push(marker);
//     });
//   }
// }
