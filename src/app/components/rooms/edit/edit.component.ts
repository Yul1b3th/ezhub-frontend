import { Component, Inject, inject } from '@angular/core';

import { RoomService } from '../../../services/room.service';
import { Room } from '../../../interfaces/room.interface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoomsLabelDirective } from '../../../directives/rooms-label.directive';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RoomsLabelDirective],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export default class EditComponent {
  private fb = inject(FormBuilder);
  private roomService = inject(RoomService);
  private router = inject(Router);

  private route = inject(ActivatedRoute);

  public roomId: number = 0;
  public formSubmitted = false;
  public photoUrl: string | null = null;
  public roomName: string | null = null;

  public editForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    details: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(500)],
    ],
    precio: ['', Validators.required],
    is_available: ['false', Validators.required],
    room_size: ['0', Validators.required],
    bed_type: ['', Validators.required],
    available_from: ['', Validators.required],
    utilities_included: ['false', Validators.required],
    deposit_required: ['false', Validators.required],
    services_included: ['false', Validators.maxLength(500)],
    photos: ['', Validators.maxLength(5000)],
    //amenityIds: [''],
    propertyId: [0, Validators.required],
  });

  constructor() {
    // Get the room ID from the route parameters
    this.route.params.subscribe((params) => {
      this.roomId = params['id'];

      // Get the room details and fill the form
      this.roomService.getRoomById(this.roomId).subscribe((room) => {
        this.editForm.patchValue(room);
        this.roomName = room.name; // Set the room name
      });
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.editForm.valid) {
      // Get the form values
      const values = this.editForm.value;

      // Convert 'precio' to a number
      values.precio = Number(values.precio);

      // Convert 'amenityIds' to an array
      //values.amenityIds = values.amenityIds.split(',');

      // Call the updateRoomJWT method with the form values
      this.roomService.updateRoomJWT(this.roomId, values).subscribe(() => {
        // Navigate back to the room list or wherever you want to go after the room is updated
        this.router.navigate(['/publish/rooms']);
      });
    }
  }

  onNoClick() {
    this.router.navigate(['/publish/rooms']);
  }
}
