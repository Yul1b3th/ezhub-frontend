import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent{
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  notification = inject(NotificationService);
}
