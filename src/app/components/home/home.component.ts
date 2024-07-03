import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MapService, PlacesService } from '../../maps/services';
import { LoadingComponent } from '../shared/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, SearchBarComponent, LoadingComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  constructor(private placesService: PlacesService) {
    console.log(this.placesService.useLocation);
  }
  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }
}
