import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { PlacesApiClient } from '../../../maps/api';
import { PropertyService } from '../../../services/property.service';
import { PlacesService } from '../../../maps/services';
import { Router } from '@angular/router';
import { RoomsLabelDirective } from '../../../directives/rooms-label.directive';

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
  private propertyService = inject(PropertyService);
  private placesApiClient = inject(PlacesApiClient);

  public addForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    details: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(500)],
    ],
    address: ['', Validators.required],
    postalCode: ['', [Validators.minLength(4), Validators.maxLength(20)]],
    city: ['', Validators.required],
    //city: [{ value: '', disabled: true }, Validators.required],
    country: ['España', Validators.required],
    latitude: [
      '',
      [Validators.required, Validators.min(-90), Validators.max(90)],
    ],
    longitude: [
      '',
      [Validators.required, Validators.min(-180), Validators.max(180)],
    ],
    is_available: [false, Validators.required],
    bedrooms: [4, Validators.required],
    bathrooms: [2, Validators.required],
    property_size: [120, Validators.required],
    smoking_allowed: [false],
    pets_allowed: [true],
    couples_allowed: [false],
    occupantCount: [0],
  });

  public formSubmitted = false;

  constructor(private placesService: PlacesService) {}

  ngOnInit() {}

  onSubmit() {
    this.formSubmitted = true;
    if (this.addForm.valid) {
      // Obtiene los valores del formulario
      let property = this.addForm.value;

      // Convierte latitude y longitude a números
      property.latitude = Number(property.latitude);
      property.longitude = Number(property.longitude);

      // Envía la nueva propiedad a la base de datos
      this.propertyService.createProperty(property).subscribe(
        (response) => {
          console.log(response);
          // Aquí puedes manejar la respuesta del servidor
          this.router.navigate(['/publish/properties']);
        },
        (error) => {
          console.log(error);
          // Aquí puedes manejar los errores
        }
      );
    }
  }

  onAddressChange() {
    const addressControl = this.addForm.get('address');
    const postalCodeControl = this.addForm.get('postalCode');
    const latitudeControl = this.addForm.get('latitude');
    const longitudeControl = this.addForm.get('longitude');

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
                this.addForm.get('city')!.setValue(city);
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
