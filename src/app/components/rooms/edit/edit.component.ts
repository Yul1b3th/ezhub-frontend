import { Component, inject } from '@angular/core';

import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export default class EditComponent {
  private roomService = inject(RoomService);

  constructor() {
    // this.roomService.getRooms().subscribe((rooms) => console.log(rooms));
  }
}
