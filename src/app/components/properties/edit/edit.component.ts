import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { RoomsLabelDirective } from '../../../directives/rooms-label.directive';
import { PropertyService } from '../../../services/property.service';
import { PlacesApiClient } from '../../../maps/api';
import { PlacesService } from '../../../maps/services';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RoomsLabelDirective],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export default class EditComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private propertyService = inject(PropertyService);
  private placesApiClient = inject(PlacesApiClient);

  public formSubmitted = false;
  public propertyId: number = 0;
  public propertyName: string | null = null;

  public editForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    details: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(500)],
    ],
    // address: ['', Validators.required],
    // postalCode: ['', [Validators.minLength(4), Validators.maxLength(20)]],
    // city: ['', Validators.required],
    // //city: [{ value: '', disabled: true }, Validators.required],
    // country: ['España', Validators.required],
    // latitude: [
    //   '',
    //   [Validators.required, Validators.min(-90), Validators.max(90)],
    // ],
    // longitude: [
    //   '',
    //   [Validators.required, Validators.min(-180), Validators.max(180)],
    // ],
    is_available: [false, Validators.required],
    // bedrooms: [4, Validators.required],
    // bathrooms: [2, Validators.required],
    // property_size: [120, Validators.required],
    // smoking_allowed: [false],
    // pets_allowed: [true],
    // couples_allowed: [false],
    // occupantCount: [0],
  });

  constructor(private placesService: PlacesService) {
    // Get the room ID from the route parameters
    this.route.params.subscribe((params) => {
      this.propertyId = params['id'];

      // Get the room details and fill the form
      this.propertyService
        .getPropertyById(this.propertyId)
        .subscribe((property) => {
          this.editForm.patchValue(property);
          this.propertyName = property.name; // Set the room name
        });
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.editForm.valid) {
      // Get the form values
      const values = this.editForm.value;

      // Convert 'precio' to a number
      //values.precio = Number(values.precio);

      // Convert 'amenityIds' to an array
      //values.amenityIds = values.amenityIds.split(',');

      // Call the updateRoomJWT method with the form values
      this.propertyService
        .updatePropertyJWT(this.propertyId, values)
        .subscribe(() => {
          // Navigate back to the room list or wherever you want to go after the room is updated
          this.router.navigate(['/publish/properties']);
        });
    }
  }

  onAddressChange() {
    const addressControl = this.editForm.get('address');
    const postalCodeControl = this.editForm.get('postalCode');
    const latitudeControl = this.editForm.get('latitude');
    const longitudeControl = this.editForm.get('longitude');

    console.log('onAddressChange');

    if (
      addressControl &&
      postalCodeControl &&
      latitudeControl &&
      longitudeControl
    ) {
      const address = addressControl.value;
      const postalCode = postalCodeControl.value;

      if (address && postalCode) {
        this.placesApiClient
          .get<any>(`/${address}, ${postalCode}.json`, {})
          .subscribe(
            (response) => {
              const { features } = response;
              console.log(features);

              if (features.length > 0) {
                const { center } = features[0];
                latitudeControl.setValue(center[1]);
                longitudeControl.setValue(center[0]);

                // Obtén la ciudad y la imprime en la consola
                const city = this.placesService.getCityFromFeature(features[0]);
                this.editForm.get('city')!.setValue(city);
                console.log(city);
              }
            },
            (error) => {
              console.log(error);
              // Aquí puedes manejar los errores
            }
          );
      }
    }
  }

  onNoClick() {
    this.router.navigate(['/publish/properties']);
  }
}
