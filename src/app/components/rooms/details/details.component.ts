import { CommonModule } from '@angular/common';
import { Component,  EnvironmentInjector,  inject, input, OnInit, runInInjectionContext, Signal,  } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';



import { LngLat, Map, Marker } from 'mapbox-gl';

import { PublicPropertyService } from '../../../services/public-property.service';
import { PublicRoomService } from '../../../services/public-room.service';

import { AmenityService } from '../../../services/amenity.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { Room } from '../../../interfaces/room.interface';
import { Property } from '../../../interfaces/property.interface';
import { Amenity } from '../../../interfaces/amenity.interface';
import { NotificationService } from '../../shared/notification/notification.service';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { NotificationAmenityService } from '../../shared/notificationAmenity/notificationAmenity.service';
import { NotificationAmenityComponent } from '../../shared/notificationAmenity/notificationAmenity.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, NotificationComponent, NotificationAmenityComponent],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export default class DetailsComponent implements OnInit {
  public publicRoomService = inject(PublicRoomService);
  public publicPropertyService = inject(PublicPropertyService);
  public amenityService = inject(AmenityService);
  public notification = inject(NotificationService);
  public notificationAmenity = inject(NotificationAmenityService);
  private readonly _injector = inject(EnvironmentInjector);

  public productId = input<number>(0, { alias: 'id' });
  room!: Signal<Room | undefined>;

ngOnInit(): void {
  runInInjectionContext(this._injector, () => {
    this.room = toSignal(
      this.publicRoomService.getRoomById(this.productId()).pipe(
        filter((room): room is Room => room !== undefined), // Filtra los valores undefined
        switchMap(room => {
          return this.publicPropertyService.getPropertyById(room.propertyId).pipe(
            map(property => {
              // Asignamos la propiedad, pero asegurándonos de que el tipo sea Property | undefined
              room.property = property || undefined;
              return room;
            }),
            catchError(() => {
              // Si hay un error al obtener la propiedad, aún devolvemos la habitación
              return of(room);
            })
          );
        }),
        filter((room): room is Room => room !== undefined), // Filtra los valores undefined
        switchMap(room => {
          return this.amenityService.getAmenitiesById(room.id.toString()).pipe(
            map(amenities => {
              room.amenities = amenities;
              return room;
            }),
            catchError(() => {
              // Si hay un error al obtener las amenidades, aún devolvemos la habitación
              return of(room);
            })
          );
        }),
        catchError(error => {
          // Si ocurre un error en el flujo general, lo mostramos y devolvemos undefined
          console.error('Error in request chain:', error);
          return of(undefined);
        })
      ),
      { initialValue: undefined }
    );
  });
}
}

