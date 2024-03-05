import { Component, OnInit, effect, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PublicRoomService } from '../../../services/public-room.service';
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
  roomService = inject(RoomService);

  constructor() {}
}
