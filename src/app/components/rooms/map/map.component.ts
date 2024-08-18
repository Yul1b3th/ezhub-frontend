import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, computed, inject, signal } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl';

import { PublicPropertyService } from '../../../services/public-property.service';
import { Property } from '../../../interfaces/property.interface';
import { environment } from '../../../../environments/environment';
import { PlacesService } from '../../../maps/services';
import { QueryService } from '../../../services/query.service';
import MapWithMarkerComponent from '../map-with-marker/map-with-marker.component';

interface State {
  propertiesMap: Property[];
  loading: boolean;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, MapWithMarkerComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export default class MapComponent{
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  // private http = inject(HttpClient);
  // private readonly baseUrl: string = environment.baseUrl;
  // private markers: Marker[] = [];

  // @ViewChild('map') divMap?: ElementRef;
  // public map?: Map;
  // public lngLat: [number, number] = [2.187975058256683, 41.392281189125214];

  // public cond = false;

  // stateSignal = signal<State>({
  //   loading: true,
  //   propertiesMap: [],
  // });

  // // Señales computadas
  // public properties = computed(() => this.stateSignal().propertiesMap);
  // public loading = computed(() => this.stateSignal().loading);

  // constructor(
  //   private publicPropertyService: PublicPropertyService,
  //   private placesService: PlacesService,
  //   private queryService: QueryService
  // ) {}

  // ngOnInit(): void {
  //   this.queryService.query$.subscribe((query) => {
  //     this.filterProperties(query);
  //   });
  // }

  // filterProperties(query: string = '') {
  //   //console.log('filterProperties');

  //   // Filtra las propiedades basándose en la consulta y la geolocalización
  //   this.publicPropertyService
  //     .getPublicProperties()
  //     .subscribe((properties: Property[]) => {
  //       let filteredProperties: Property[] = [];
  //       //console.log(properties);

  //       properties.forEach((property: Property) => {
  //         let userLongitude: number = 0;
  //         let userLatitude: number = 0;
  //         //console.log(this.placesService.useLocation);

  //         if (this.placesService.useLocation) {
  //           //console.log('this.placesService.useLocation');

  //           [userLongitude, userLatitude] = this.placesService.useLocation;
  //         }
  //         if (userLongitude !== 0 && userLatitude !== 0 && !query) {
  //           //console.log('useLocation');
  //           //console.log();

  //           if (
  //             this.placesService.calculateDistance(
  //               userLongitude,
  //               userLatitude,
  //               Number(property.longitude),
  //               Number(property.latitude)
  //             )
  //           ) {
  //             filteredProperties.push(property);
  //             //console.log('useLocation', filteredProperties);
  //           }
  //         }
  //         if (query) {
  //           //console.log(query);
  //           if (property.city.toLowerCase().includes(query.toLowerCase())) {
  //             filteredProperties.push(property);
  //           }
  //           if (property.postalCode.includes(query)) {
  //             filteredProperties.push(property);
  //           }
  //         }
  //         if (!this.placesService.useLocation && !query) {
  //           //console.log('!this.placesService.useLocation');
  //           filteredProperties.push(property);
  //         }
  //       });

  //       if (filteredProperties) {
  //         this.cond = true;
  //       }
  //       //console.log({ filteredProperties });

  //       this.stateSignal.set({
  //         loading: false,
  //         propertiesMap: filteredProperties,
  //       });
  //     });
  // }
}
