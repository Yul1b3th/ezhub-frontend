import { ChangeDetectorRef, Component, DoCheck, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PublicRoomService } from '../../../services/public-room.service';
import { Room } from '../../../interfaces/room.interface';

@Component({
  selector: 'app-show-rooms',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './show-rooms.component.html',
  styleUrl: './show-rooms.component.scss'
})
export class ShowRoomsComponent implements OnInit, DoCheck {
  publicRoomService = inject(PublicRoomService);
  rooms: Room[] = [];
  private cdr = inject(ChangeDetectorRef); // Inyecta ChangeDetectorRef

  constructor() {
    console.log('constructor');

    effect(() => {
      this.rooms = this.publicRoomService.rooms();
      if (this.rooms && this.rooms.length > 0) {
        console.log('Rooms:', this.rooms);
      } else {
        console.warn('Rooms data is not available yet or there are no rooms.');
      }
      this.cdr.detectChanges(); // Fuerza la detección de cambios después de la actualización
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.rooms = this.publicRoomService.rooms();
  }

  ngDoCheck() {
    const updatedRooms = this.publicRoomService.rooms();
    if (updatedRooms !== this.rooms) {
      this.rooms = updatedRooms;
      console.log('Rooms updated:', this.rooms);
      this.cdr.detectChanges(); // Fuerza la detección de cambios aquí también
    }
  }
}
