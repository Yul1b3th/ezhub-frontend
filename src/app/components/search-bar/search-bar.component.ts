import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PlacesService } from '../../maps/services';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
} from 'rxjs';
import { PublicRoomService } from '../../services/public-room.service';
import { PublicPropertyService } from '../../services/public-property.service';
import { QueryService } from '../../services/query.service';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  private fb = inject(FormBuilder);
  publicRoomService = inject(PublicRoomService);

  public searchForm: FormGroup = this.fb.group({
    searchControl: ['', [Validators.minLength(3)]],
  });

  constructor(
    private placesService: PlacesService,
    private publicPropertyService: PublicPropertyService,
    private queryService: QueryService
  ) {}

  ngOnInit() {}

  onSubmit() {
    let query = this.searchForm.get('searchControl')?.value;

    query = query?.trim();

    if ((query ?? '').length > 3) {
      if (/^[01-52]\d{4}$/.test(query)) {
        // Si la consulta es un código postal, verifica si existe
        this.placesService
          .checkPostalCode(query)
          .pipe(map((exists) => ({ query, exists })))
          .subscribe(({ query, exists }) => {
            if (exists) {
              this.publicRoomService.filterRooms(query);
              this.queryService.setQuery(query);
            } else {
              //console.log('El código postal no existe');
            }
          });
      } else {
        // Si la consulta no es un código postal, asume que es una ciudad y realiza la búsqueda
        //console.log('Buscando por ciudad');

        //this.publicPropertyService.filterProperties(query);
        this.publicRoomService.filterRooms(query);
        this.queryService.setQuery(query);
      }
    }
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
