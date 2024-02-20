import { Component, OnInit, effect, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PublicRoomService } from '../../../services/public-room.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export default class ListComponent {
  publicRoomService = inject(PublicRoomService);
}
