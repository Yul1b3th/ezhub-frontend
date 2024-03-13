import { Component, inject } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

import { RoomService } from '../../../services/room.service';
import { Amenity } from '../../../interfaces/amenity.interface';

@Component({
  selector: 'app-publish-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publish-details.component.html',
  styleUrl: './publish-details.component.scss',
})
export default class PublishDetailsComponent {
  private roomService = inject(RoomService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public amenities: Amenity[] = [];

  constructor() {
    this.roomService.getRooms().subscribe(() => {
      //console.log(this.roomService.roomsJWT());
    });
  }

  public room = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => {
        return this.roomService.getRoomById(id).pipe(
          tap((room) => {
            this.roomService.getRoomAmenities(id).subscribe((amenities) => {
              room.amenityIds = amenities.map((a) => a.id);
              this.amenities = amenities;
            });
          })
        );
      })
    )
  );

  getAmenityName(id: number): string {
    const amenity = this.amenities.find((a) => a.id === id);
    return amenity ? amenity.name : '';
  }

  onNoClick() {
    this.router.navigate(['/publish/rooms']);
  }
}
