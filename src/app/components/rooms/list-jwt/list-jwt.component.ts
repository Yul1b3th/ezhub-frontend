import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-jwt.component.html',
  styleUrl: './list-jwt.component.scss',
})
export default class ListJwtComponent {
  public roomService = inject(RoomService);
  public deleteModalOpen = false;
  public roomToDelete: number | null = null;

  constructor() {
    this.roomService.getRooms().subscribe(() => {
      //console.log(this.roomService.roomsJWT());
    });
  }

  onDeleteRoom(roomId: number) {
    this.deleteModalOpen = true;
    this.roomToDelete = roomId;
  }

  confirmDelete() {
    if (this.roomToDelete !== null) {
      this.roomService.deleteRoombyIDJWT(this.roomToDelete).subscribe(
        () => {
          this.deleteModalOpen = false;
          this.roomToDelete = null;
          this.roomService.getRooms().subscribe();
        },
        (error) => {
          console.error('Error deleting property:', error);
        }
      );
    }
  }

  cancelDelete() {
    this.deleteModalOpen = false;
    this.roomToDelete = null;
  }
}
