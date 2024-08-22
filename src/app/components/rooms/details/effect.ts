import { CommonModule } from '@angular/common';
import { Component,  effect,  inject, input, signal,  } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';



import { LngLat, Map, Marker } from 'mapbox-gl';

import { PublicPropertyService } from '../../../services/public-property.service';
import { PublicRoomService } from '../../../services/public-room.service';

import { AmenityService } from '../../../services/amenity.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap } from 'rxjs';
import { Room } from '../../../interfaces/room.interface';
import { Property } from '../../../interfaces/property.interface';
import { Amenity } from '../../../interfaces/amenity.interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export default class DetailsComponent {
  public productId = input<number>(0, { alias: 'id' });
  public publicRoomService = inject(PublicRoomService);
  public publicPropertyService = inject(PublicPropertyService);
  public amenityService = inject(AmenityService);

  // Signal para almacenar la habitación
  public room = signal<Room | null>(null);
  // Signal para manejar errores
  public error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const id = this.productId();
      if (id) {
        this.publicRoomService.getRoomById(id).subscribe({
          next: (room) => {
            if (room && room.propertyId) {
              this.room.set(room); // Almacena la habitación inicialmente

              // Obtén la propiedad relacionada
              this.publicPropertyService.getPropertyById(room.propertyId).subscribe({
                next: (property) => {
                  if (property) {
                    room.property = property;
                    this.room.set({ ...room }); // Actualiza la signal con la propiedad

                    // Obtén los amenities relacionados
                    this.amenityService.getAmenitiesById(room.id.toString()).subscribe({
                      next: (amenities) => {
                        room.amenities = amenities;
                        this.room.set({ ...room }); // Actualiza la signal con los amenities
                        console.log(this.room()); // Imprime la habitación completa con los detalles
                      },
                      error: (err) => {
                        this.error.set('Error fetching amenities');
                        console.error('Error fetching amenities:', err);
                      }
                    });
                  }
                },
                error: (err) => {
                  this.error.set('Error fetching property');
                  console.error('Error fetching property:', err);
                }
              });
            }
          },
          error: (err) => {
            this.error.set('Error fetching room');
            console.error('Error fetching room:', err);
          }
        });
      }
    });
  }
}

