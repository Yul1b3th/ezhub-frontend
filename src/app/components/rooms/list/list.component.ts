import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoomService } from '../../../services/public-room.service';
import { RouterModule } from '@angular/router';
import { PlacesService } from '../../../maps/services';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { NotificationService } from '../../shared/notification/notification.service';
import { PublicPropertyService } from '../../../services/public-property.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export default class ListComponent {
  publicRoomService = inject(PublicRoomService);
  publicPropertyService = inject(PublicPropertyService);
  notification = inject(NotificationService);
  placesService = inject(PlacesService);

  constructor() {
    // effect(() => {
    //   console.log( this.publicPropertyService.properties() );
    // });
    // effect(() => {
    //   console.log( this.publicRoomService.rooms() );
    // });

    // effect(() => {
    //   const properties = this.publicPropertyService.properties();
    //   console.log('Properties:', properties);

    //   // Iterar sobre las propiedades y mostrar las habitaciones en la consola
    //   properties.forEach(property => {
    //     console.log(`Property: ${property.name}`);
    //     property.rooms.forEach(room => {
    //       console.log(`Room ID: ${room.id}, Room Name: ${room.name}`);
    //     });
    //   });
    // });

effect(() => {
  const rooms = this.publicRoomService.rooms();
  if (rooms) {
    console.log('Rooms:', rooms);
  } else {
    console.warn('Rooms data is not available yet.');
  }
});
  }
}
