import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { RoomService } from '../../../services/room.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Room } from '../../../interfaces/room.interface';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [],

  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export default class AddComponent implements OnInit {
  private roomService = inject(RoomService);

  private readonly baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);

  rooms: Room[] = [];

  constructor(private cd: ChangeDetectorRef) {
    // this.roomService.getRooms().subscribe((rooms) => console.log(rooms));
  }
  /* ngOnInit(): void {
    this.getAllRooms();
  } */

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
      this.cd.markForCheck(); // Indica a Angular que debe verificar este componente para posibles cambios
    });
  }

  getAllRooms() {
    this.http.get<Room[]>(`${this.baseUrl}/rooms`).subscribe(
      (res: any) => {
        this.rooms = res.data;
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
