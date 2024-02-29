import { Component, OnInit, effect, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PublicRoomService } from '../../../services/public-room.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export default class ListComponent {
  publicRoomService = inject(PublicRoomService);

  constructor() {
    if (localStorage.getItem('url')) {
      localStorage.removeItem('url');
    }
  }
}
