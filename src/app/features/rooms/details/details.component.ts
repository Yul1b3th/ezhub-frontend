import { Component, EnvironmentInjector, inject, input, OnInit, runInInjectionContext, Signal, effect, WritableSignal, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { catchError, filter, map, of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { LoadingComponent } from '@core/components/loading/loading.component';
import { NotificationComponent } from '@components/shared/notification/notification.component';
import { PublicRoomService } from '@services/public-room.service';
import { PublicPropertyService } from '@services/public-property.service';
import { AmenityService } from '@services/amenity.service';
import { NotificationService } from '@components/shared/notification/notification.service';
import { NotificationAmenityService } from '@components/shared/notificationAmenity/notificationAmenity.service';
import { Room } from '@interfaces/room.interface';
import { ShowDetailsComponent } from '@features/rooms/show-details/show-details.component';




@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationComponent, ShowDetailsComponent, LoadingComponent],
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
  public showDetails: WritableSignal<Room | undefined> = signal(undefined);
  public roomsMap = computed(() => this.room());
  public loading: boolean = false;


  ngOnInit(): void {
          console.log(this.publicRoomService.getstateRoomId());
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
        map(room => {
          // Aquí se establecen todas las propiedades del room, por lo tanto, si ha llegado hasta aquí, todo ha ido bien.
          this.loading = true;  // Cambia el estado de `loading` a true aquí
          return room;
        }),
          catchError(error => {
            console.error('Error in request chain:', error);
            this.loading = false;
            return of(undefined);
          })
        ),
        { initialValue: undefined }
      );
    });
          console.log(this.publicRoomService.getstateRoomId());
  }

  constructor() {
    effect(() => {
      if (this.room()?.property) {
        console.log(this.room()?.property);
      }
    });
    effect(() => {
      console.log(this.publicRoomService.getstateRoomId());

      if (this.room()) {
        console.log(this.roomsMap());
      }
    });
  }

}
