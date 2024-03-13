import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { RoomsLabelDirective } from '../../../directives/rooms-label.directive';
import { RoomService } from '../../../services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../../../interfaces/property.interface';
import { PropertyService } from '../../../services/property.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RoomsLabelDirective],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export default class AddComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private roomService = inject(RoomService);
  private propertyService = inject(PropertyService);

  public formSubmitted = false;
  public properties: Property[] = [];

  public addForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    details: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(500)],
    ],
    precio: ['', Validators.required],
    is_available: [false, Validators.required],
    room_size: [10, Validators.required],
    bed_type: ['Single bed', Validators.required],
    available_from: ['2024-03-01', Validators.required],
    utilities_included: [false, Validators.required],
    deposit_required: [false, Validators.required],
    services_included: [
      'Contrato de alquiler, Servicio de limpieza',
      Validators.maxLength(500),
    ],
    photos: ['9.jpg', Validators.maxLength(5000)],
    amenityIds: [[1, 5, 9]],
    propertyId: ['', Validators.required],
  });

  ngOnInit(): void {
    this.propertyService.getProperties().subscribe((properties) => {
      this.properties = properties;
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    console.log('onSubmit');
    console.log(this.addForm.errors);
    if (this.addForm.valid) {
      console.log('this.addForm.valid');
      // Get the form values
      const values = this.addForm.value;

      // Convert 'precio' to a number
      values.precio = Number(values.precio);
      values.propertyId = Number(values.propertyId);

      // Call the createRoom method with the form values
      this.roomService.createRoom(values).subscribe(() => {
        // Navigate back to the room list or wherever you want to go after the room is created
        this.router.navigate(['/publish/rooms']);
      });
    }
  }

  onNoClick() {
    this.router.navigate(['/publish/rooms']);
  }
}
