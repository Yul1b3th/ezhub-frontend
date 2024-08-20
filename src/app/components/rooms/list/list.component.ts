import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoomService } from '../../../services/public-room.service';
import { RouterModule } from '@angular/router';
import { PlacesService } from '../../../maps/services';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { NotificationService } from '../../shared/notification/notification.service';
import { PublicPropertyService } from '../../../services/public-property.service';
import { ShowRoomsComponent } from '../show-rooms/show-rooms.component';
import { LoadingComponent } from '../../../core/components/loading/loading.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,  NotificationComponent, ShowRoomsComponent, LoadingComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export default class ListComponent {
  notification = inject(NotificationService);
  publicRoomService = inject(PublicRoomService);
  public rooms = this.publicRoomService.rooms();
    constructor() {
    effect(() => {
      this.rooms = this.publicRoomService.rooms();
      if (this.rooms ) {
        // console.log('Rooms:', this.rooms );
      } else {
        console.warn('Rooms data is not available yet.');
      }
    });
  }

}
