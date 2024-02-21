import { Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { PublicPropertyService } from '../../../services/public-property.service';
import {
  EMPTY,
  Subscription,
  catchError,
  forkJoin,
  switchMap,
  tap,
} from 'rxjs';
import { PublicRoomService } from '../../../services/public-room.service';
import { Room } from '../../../interfaces/room.interface';
import { CommonModule } from '@angular/common';
import { Property } from '../../../interfaces/property.interface';
import { Amenity } from '../../../interfaces/amenity.interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export default class DetailsComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  public propertyService = inject(PublicPropertyService);
  public roomService = inject(PublicRoomService);

  public propertyData: Property | undefined;

  public roomData: Room | undefined;
  public room: Room | undefined;
  amenities!: Amenity[];
  private subscription: Subscription | undefined;

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
      });
  }
}
