import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { PublicRoomService } from '../../services/public-room.service';
import { User } from '../../interfaces/user.interface';
import { NotificationService } from '../shared/notification/notification.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export default class ContactComponent implements OnInit {
  public notification = inject(NotificationService);
  public usersService = inject(UsersService);
  public authService = inject(AuthService);
  public roomService = inject(PublicRoomService);
  public user: User | undefined;
  public address: string = '';
  public phone: number = 0;
  public email: string = '';
  public whatsapp: number = 0;

  constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const roomId = this.route.snapshot.paramMap.get('id');
  if (roomId) {
    this.roomService.getRoomById(+roomId).subscribe((room) => {
      if (room) { // Verificar si room no es null
        this.usersService.getUsers().subscribe((users) => {
          this.user = users.find((user) => user.email === room.userEmail);
          if (this.user) {
            this.address = this.user.address;
            this.phone = this.user.phone;
            this.email = this.user.email;
            this.whatsapp = this.user.whatsapp;
          }
        });
      } else {
        this.notification.showNotification(
          `Room with ID ${roomId} not found.`, 'error'
        );
      }
    });
  }
}
}
