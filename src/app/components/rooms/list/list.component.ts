import { Component, OnInit, effect, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PublicRoomService } from '../../../services/public-room.service';
import { RouterModule } from '@angular/router';
import { PlacesService } from '../../../maps/services';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { NotificationService } from '../../shared/notification/notification.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export default class ListComponent implements OnInit {
  publicRoomService = inject(PublicRoomService);
    notification = inject(NotificationService);

  constructor(private placesService: PlacesService) {
    // console.log(this.publicRoomService.rooms());
  }

  ngOnInit(): void {
    //console.log(this.placesService.useLocation);
  }
}
