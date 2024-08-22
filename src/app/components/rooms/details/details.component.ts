import { Component, EnvironmentInjector, inject, input, OnInit, runInInjectionContext, Signal } from '@angular/core';

import { PublicRoomService } from '../../../services/public-room.service';
import { PublicPropertyService } from '../../../services/public-property.service';
import { AmenityService } from '../../../services/amenity.service';
import { NotificationService } from '../../shared/notification/notification.service';
import { NotificationAmenityService } from '../../shared/notificationAmenity/notificationAmenity.service';
import { Room } from '../../../interfaces/room.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export default class DetailsComponent implements OnInit {
  public publicRoomService = inject(PublicRoomService);
  public publicPropertyService = inject(PublicPropertyService);
  public amenityService = inject(AmenityService);
  public notification = inject(NotificationService);
  public notificationAmenity = inject(NotificationAmenityService);
  private readonly _injector = inject(EnvironmentInjector);

  public productId = input<number>(0, { alias: 'id' });
  public room!: Signal<Room | undefined>;



  ngOnInit(): void {
    runInInjectionContext(this._injector, () => {
      this.room = toSignal(
        this.publicRoomService.getRoomById(this.productId()).pipe(
          filter((room): room is Room => room !== undefined),
          switchMap(room => {
            return this.publicPropertyService.getPropertyById(room.propertyId).pipe(
              map(property => {
                room.property = property || undefined;
                return room;
              }),
              catchError(() => {
                return of(room);
              })
            );
          }),
          filter((room): room is Room => room !== undefined),
          switchMap(room => {
            return this.amenityService.getAmenitiesById(room.id.toString()).pipe(
              map(amenities => {
                room.amenities = amenities;
                return room;
              }),
              catchError(() => {
                return of(room);
              })
            );
          }),
          catchError(error => {
            console.error('Error in request chain:', error);
            return of(undefined);
          })
        ),
        { initialValue: undefined }
      );
    });
  }

}
