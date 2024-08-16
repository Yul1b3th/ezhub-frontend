import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { EMPTY, Subscription, catchError, forkJoin, switchMap, tap } from 'rxjs';

import { LngLat, Map, Marker } from 'mapbox-gl';

import { PublicPropertyService } from '../../../services/public-property.service';
import { PublicRoomService } from '../../../services/public-room.service';
import { Room } from '../../../interfaces/room.interface';
import { Property } from '../../../interfaces/property.interface';
import { Amenity } from '../../../interfaces/amenity.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export default class DetailsComponent implements OnInit, OnDestroy {
  public authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  public propertyService = inject(PublicPropertyService);
  public roomService = inject(PublicRoomService);

  public propertyData: Property | undefined;

  public roomData: Room | undefined;
  public room: Room | undefined;
  public amenities: Amenity[] | undefined;
  private subscription: Subscription | undefined;

  @ViewChild('map') divMap?: ElementRef;
  public map?: Map;
  public lngLat: [number, number] = [2.187975058256683, 41.392281189125214];

  constructor() {}

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadData() {
    this.subscription = this.route.params
      .pipe(
        switchMap(({ id }) =>
          this.roomService.getRoomById(id).pipe(
            tap((room: Room) => {
              this.roomData = room;
            }),
            switchMap((room: Room) => {
              return forkJoin({
                property: this.propertyService.getPropertyById(room.propertyId),
                amenities: this.roomService.getRoomAmenities(room.id),
              });
            })
          )
        ),
        catchError((error) => {
          console.error('Error loading data', error);
          return EMPTY;
        })
      )
      .subscribe(({ property, amenities }) => {
        this.propertyData = property;
        this.amenities = amenities;
        this.initializeMap();
      });
  }

  private initializeMap() {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    // Asegúrate de que propertyData está definido y tiene latitud y longitud
    if (
      this.propertyData &&
      this.propertyData.latitude &&
      this.propertyData.longitude
    ) {
      // Convierte la latitud y la longitud a números
      const lat = parseFloat(this.propertyData.latitude);
      const lng = parseFloat(this.propertyData.longitude);

      // Crea el mapa con el centro en la ubicación del marcador
      this.map = new Map({
        container: this.divMap?.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: 13,
      });

      // Crea un nuevo marcador con un color personalizado y añádelo al mapa
      new Marker({ color: '#30daa6' }).setLngLat([lng, lat]).addTo(this.map);
    }
  }
}
