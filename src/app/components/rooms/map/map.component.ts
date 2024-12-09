import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import MapWithMarkerComponent from '../map-with-marker/map-with-marker.component';
import { NotificationService } from '../../shared/notification/notification.service';
import { PublicRoomService } from '../../../services/public-room.service';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { LoadingComponent } from '../../../core/components/loading/loading.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, MapWithMarkerComponent, NotificationComponent, LoadingComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export default class MapComponent {
  notification = inject(NotificationService);
  publicRoomService = inject(PublicRoomService);
}
