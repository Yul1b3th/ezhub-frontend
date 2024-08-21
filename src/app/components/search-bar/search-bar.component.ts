import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { map } from 'rxjs';

import { PlacesService } from '../../maps/services';
import { PublicRoomService } from '../../services/public-room.service';
import { SearchBarLabelDirective } from '../../directives/search-bar-label.directive';
import { QueryStateService } from './query-state.service';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchBarLabelDirective],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  private fb = inject(FormBuilder);
  private publicRoomService = inject(PublicRoomService);
  private queryStateService = inject(QueryStateService);
  private placesService = inject(PlacesService);

  public query: string = '';

  public searchForm: FormGroup = this.fb.group({
    searchControl: [''],
  });

  public formSubmitted = false;

  ngOnInit() {
    // Rellenar el buscador con la última consulta desde el servicio de estado
    const lastQuery = this.queryStateService.getQuery()();
    this.query = lastQuery;
    this.searchForm.get('searchControl')?.setValue(lastQuery);
  }

  onSubmit() {
    this.formSubmitted = true;
    this.query = this.searchForm.get('searchControl')?.value;

    this.query = this.query?.trim();
    console.log('query', this.query);

    if (this.query === '') {
      // Si la consulta está vacía, restablecer la búsqueda
      this.query = '';
      this.searchForm.get('searchControl')?.setValue('');
      this.publicRoomService.queryRooms(''); // Realizar una consulta vacía para obtener todas las habitaciones
      this.queryStateService.setQuery('');
    } else if ((this.query ?? '').length > 3) {
      if (/^[01-52]\d{4}$/.test(this.query)) {
        // Si la consulta es un código postal, verifica si existe
        this.placesService
          .checkPostalCode(this.query)
          .pipe(map((exists) => ({ query: this.query, exists })))
          .subscribe(({ query, exists }) => {
            if (exists) {
              this.publicRoomService.queryRooms(query);
              this.queryStateService.setQuery(query);
            } else {
              //console.log('El código postal no existe');
            }
          });
      } else {
        // Si la consulta no es un código postal, asume que es una ciudad y realiza la búsqueda
        //console.log('Buscando por ciudad');

        this.publicRoomService.queryRooms(this.query);
        this.queryStateService.setQuery(this.query);
      }
    }
  }

  resetSearch() {
    this.query = '';
    this.searchForm.get('searchControl')?.setValue('');
    this.publicRoomService.queryRooms(''); // Realizar una consulta vacía para obtener todas las habitaciones
    this.queryStateService.setQuery('');
  }

  cleanInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    // Elimina los espacios al principio y al final, y reemplaza los espacios múltiples con un solo espacio
    inputElement.value = inputElement.value.replace(/\s+/g, ' ');
  }

  preventInitialSpace(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.length === 0 && event.key === ' ') {
      event.preventDefault();
    }
  }
}
