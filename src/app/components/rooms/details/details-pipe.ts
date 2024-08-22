import { CommonModule } from '@angular/common';
import { Component,  inject, input,  } from '@angular/core';
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
    private route = inject(ActivatedRoute);
  public publicRoomService = inject(PublicRoomService);
  public publicPropertyService = inject(PublicPropertyService);
  public amenityService = inject(AmenityService);

  // Recibir el ID del producto desde la entrada del componente
  public productId = input<number>(0, { alias: 'id' });

  public room = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.publicRoomService.getRoomById(id)),
      switchMap((room: Room | null) => {
        if (room && room.propertyId) {
          return this.publicPropertyService.getPropertyById(room.propertyId).pipe(
            switchMap((property: Property | null) => {
              if (property) {
                room.property = property;
                return this.amenityService.getAmenitiesById(room.id.toString()).pipe(
                  switchMap((amenities: Amenity[]) => {
                    room.amenities = amenities;
                    console.log(room);
                    return of(room);
                  })
                );
              }
              return of(room);
            })
          );
        }
        return of(room);
      }),
      catchError(error => {
        console.error('Error in the request chain:', error);
        return of(null);
      })
    ),
    { initialValue: null }
  );


}
