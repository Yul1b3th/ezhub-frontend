import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { PlacesService } from '../../maps/services';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, SearchBarComponent, LoadingComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  constructor(private placesService: PlacesService) { }

  get isUserLocationReady() {
    // console.log(this.placesService.isUserLocationReady);
    // console.log(this.placesService.userDeniedLocation);
    if (this.placesService.userDeniedLocation && !this.placesService.isUserLocationReady) {
      return true
    }

    return this.placesService.isUserLocationReady;
  }
}
