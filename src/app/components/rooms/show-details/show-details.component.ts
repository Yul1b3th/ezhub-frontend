import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, inject, Input,Signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';


import { LngLat, Map, Marker } from 'mapbox-gl';

import { NotificationComponent } from '../../shared/notification/notification.component';
import { NotificationAmenityComponent } from '../../shared/notificationAmenity/notificationAmenity.component';
import { NotificationAmenityService } from '../../shared/notificationAmenity/notificationAmenity.service';
import { Room } from '../../../interfaces/room.interface';

@Component({
  selector: 'app-show-details',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationComponent, NotificationAmenityComponent],
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.scss'
})
export class ShowDetailsComponent {
  public notificationAmenity = inject(NotificationAmenityService);
  @Input() room!: Signal<Room | undefined>;

  @ViewChild('map', { static: false }) divMap?: ElementRef;
  public map?: Map;

  constructor() {
    effect(() => {
      if (this.room()?.property) {
        console.log(this.room()?.property);
        this.initializeMap()
      }
    });
  }

  private initializeMap() {
    if (!this.divMap) throw new Error('El elemento HTML no fue encontrado');

    const room = this.room();
    const property = room?.property;
    const latitude = property?.latitude;
    const longitude = property?.longitude;

    if (latitude && longitude) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);

      this.map = new Map({
        container: this.divMap.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: 13,
      });

      new Marker({ color: '#30daa6' }).setLngLat([lng, lat]).addTo(this.map);
    }
  }
}
