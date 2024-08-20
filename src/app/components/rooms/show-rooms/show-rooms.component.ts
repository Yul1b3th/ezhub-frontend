import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PublicRoomService } from '../../../services/public-room.service';

@Component({
  selector: 'app-show-rooms',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './show-rooms.component.html',
  styleUrl: './show-rooms.component.scss'
})
export class ShowRoomsComponent {
  publicRoomService = inject(PublicRoomService);

  constructor() {
    // effect(() => {
    //   const rooms = this.publicRoomService.rooms();
    //   if (rooms) {
    //     console.log('Rooms:', rooms);
    //   } else {
    //     console.warn('Rooms data is not available yet.');
    //   }
    // });
  }
}
