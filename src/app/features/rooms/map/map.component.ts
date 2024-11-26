import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import MapWithMarkerComponent from '@components/rooms/map-with-marker/map-with-marker.component';
import { NotificationComponent } from '@components/shared/notification/notification.component';
import { NotificationService } from '@components/shared/notification/notification.service';
import { PublicRoomService } from '@services/public-room.service';



@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, MapWithMarkerComponent, NotificationComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export default class MapComponent {
  notification = inject(NotificationService);
  publicRoomService = inject(PublicRoomService);
}
