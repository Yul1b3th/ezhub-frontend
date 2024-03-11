import { Component, Inject, inject } from '@angular/core';

import { RoomService } from '../../../services/room.service';
import { Room } from '../../../interfaces/room.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomsLabelDirective } from '../../../directives/rooms-label.directive';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, RoomsLabelDirective],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export default class EditComponent {
  private roomService = inject(RoomService);
  public formSubmitted = false;
  public photoUrl: string | null = null;

  /*   public editForm = this.fb.group({
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
    amenityIds: [''],
    propertyId: [0, Validators.required],
  }); */

  /*   constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Room
  ) {
    this.editForm.setValue({
      name: data.name,
      details: data.details,
      precio: data.precio,
      is_available: data.is_available.toString(),
      room_size: data.room_size.toString(),
      bed_type: data.bed_type,
      available_from: data.available_from,
      utilities_included: data.utilities_included.toString(),
      deposit_required: data.deposit_required.toString(),
      services_included: data.services_included,
      photos: data.photos,
      amenityIds: data.amenityIds ? data.amenityIds.join(',') : null,
      propertyId: data.propertyId,
    });

    if (data.photos) {
      this.photoUrl = `assets/img/bedrooms/${data.photos}`;
    }
  } */

  onNoClick(): void {
    //this.dialogRef.close();
  }

  /*   onSubmit(): void {
    this.formSubmitted = true;

    if (this.editForm.valid) {
      this.roomService
        .updateRoomJWT(this.data.id, this.editForm.value)
        .subscribe(() => {
          this.dialogRef.close();
        });
    }
  } */

  /*   onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editForm.patchValue({
        photos: file,
      });
    }
  } */
}
