import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { NotificationAmenityService } from './notificationAmenity.service';

@Component({
  selector: 'app-notification-amenity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificationAmenity.component.html',
  styleUrls: ['./notificationAmenity.component.scss'],
})
export class NotificationAmenityComponent{
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  notification = inject(NotificationAmenityService);
}
