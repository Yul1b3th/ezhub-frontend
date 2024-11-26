import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoomService } from '@services/public-room.service';
import { NotificationService } from '@components/shared/notification/notification.service';
import { ShowRoomsComponent } from '@components/rooms/show-rooms/show-rooms.component';
import { NotificationComponent } from '@components/shared/notification/notification.component';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NotificationComponent, ShowRoomsComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export default class ListComponent implements OnInit {
  notification = inject(NotificationService);
  publicRoomService = inject(PublicRoomService);

  constructor() {
    console.log('constructor ListComponent');
    effect(() => {
      console.log(this.publicRoomService.rooms());

    });


  }

  ngOnInit(): void {
    console.log('ngOnInit ListComponent');
    ;
  }
}
