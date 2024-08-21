import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoomService } from '../../../services/public-room.service';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { NotificationService } from '../../shared/notification/notification.service';
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
}
