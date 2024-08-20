import { CommonModule } from '@angular/common';
import { Component,  OnInit,  effect, inject } from '@angular/core';


import { Property } from '../../../interfaces/property.interface';
import MapWithMarkerComponent from '../map-with-marker/map-with-marker.component';
import { NotificationService } from '../../shared/notification/notification.service';
import { PublicRoomService } from '../../../services/public-room.service';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { LoadingComponent } from '../../../core/components/loading/loading.component';

interface State {
  propertiesMap: Property[];
  loading: boolean;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, MapWithMarkerComponent, NotificationComponent, LoadingComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export default class MapComponent implements OnInit {
  notification = inject(NotificationService);
  publicRoomService = inject(PublicRoomService);
  public rooms = this.publicRoomService.rooms();


  constructor() {
    console.log('constructor Map');

    effect(() => {
      this.rooms = this.publicRoomService.rooms();
      if (this.rooms ) {
        console.log('Rooms:', this.rooms );
      } else {
        console.warn('Rooms data is not available yet.');
      }
    });


  }
  ngOnInit(): void {
    console.log('ngOnInit Map');
  }


}
