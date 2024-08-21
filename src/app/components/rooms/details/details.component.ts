import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { EMPTY, Subscription, catchError, forkJoin, of, switchMap, tap } from 'rxjs';

import { LngLat, Map, Marker } from 'mapbox-gl';

import { PublicPropertyService } from '../../../services/public-property.service';
import { PublicRoomService } from '../../../services/public-room.service';
import { Room } from '../../../interfaces/room.interface';
import { Property } from '../../../interfaces/property.interface';
import { Amenity } from '../../../interfaces/amenity.interface';
import { AuthService } from '../../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AmenityService } from '../../../services/amenity.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export default class DetailsComponent {
  private route = inject(ActivatedRoute);
  private publicRoomService = inject(PublicRoomService);
  private amenityService = inject(AmenityService);

  // Cargar los detalles de la habitación basados en el ID de la ruta
  public room = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => {
        const foundRoom = this.publicRoomService.rooms().find(room => room.id === +id);
        return of(foundRoom || null);
      })
    ),
    { initialValue: null }
  );

  // Cargar las amenities de la habitación basados en el ID de la ruta
  public amenities = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.amenityService.getAmenitiesById(id))
    ),
    { initialValue: [] }
  );

  // Combinar los detalles de la habitación con las amenities
  public roomWithAmenities = computed(() => {
    const room = this.room();
    const amenities = this.amenities();
    if (room) {
      return { ...room, amenities };
    }
    return null;
  });

  constructor() {
    effect(() => {
      console.log(this.roomWithAmenities());
    });
  }
}


