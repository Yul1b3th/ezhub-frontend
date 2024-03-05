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
import { CustomLabelDirective } from '../../../directives/custom-label.directive';
import { PlacesService } from '../../../maps/services';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomLabelDirective],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export default class AddComponent implements OnInit {
  private propertyService = inject(PropertyService);
  private placesApiClient = inject(PlacesApiClient);
  private placesService = inject(PlacesService);
  private fb = inject(FormBuilder);

  public propertyForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    postalCode: ['', [Validators.minLength(4), Validators.maxLength(20)]],
    city: ['', Validators.required],
    country: ['España', Validators.required],
    latitude: [
      '',
      [Validators.required, Validators.min(-90), Validators.max(90)],
    ],
    longitude: [
      '',
      [Validators.required, Validators.min(-180), Validators.max(180)],
    ],
  });

  public formSubmitted = false;

  constructor() {}

  ngOnInit() {}

  onSubmitProperty() {
    this.formSubmitted = true;
    if (this.propertyForm.valid) {
      // Obtiene los valores del formulario
      let property = this.propertyForm.value;

      // Convierte latitude y longitude a números
      property.latitude = Number(property.latitude);
      property.longitude = Number(property.longitude);

      // Envía la nueva propiedad a la base de datos
      this.propertyService.createProperty(property).subscribe(
        (response) => {
          console.log(response);
          // Aquí puedes manejar la respuesta del servidor
        },
        (error) => {
          console.log(error);
          // Aquí puedes manejar los errores
        }
      );
    }
  }

  onAddressChange() {
    const addressControl = this.propertyForm.get('address');
    const postalCodeControl = this.propertyForm.get('postalCode');
    const latitudeControl = this.propertyForm.get('latitude');
    const longitudeControl = this.propertyForm.get('longitude');

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
                this.propertyForm.get('city')!.setValue(city);
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
}
