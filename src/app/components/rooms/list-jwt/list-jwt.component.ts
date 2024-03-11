import { Component, OnInit, effect, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PublicRoomService } from '../../../services/public-room.service';
import { RouterModule } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import EditComponent from '../edit/edit.component';
import { Room } from '../../../interfaces/room.interface';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-jwt.component.html',
  styleUrl: './list-jwt.component.scss',
})
export default class ListJwtComponent {
  roomService = inject(RoomService);

  constructor() {}

  onAddRoom() {}

  onEditRoom(room: Room) {
    /* console.log('onEditRoom');
    const dialogRef = this.dialog.open(EditComponent, {
      data: room,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    }); */
  }

  onDeleteRoom() {}
}
