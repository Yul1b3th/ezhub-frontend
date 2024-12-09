import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { PlacesService } from '../../maps/services';
import { LocationPermissionComponent } from '../../core/components/location-permission/location-permission.component';
import { LoadingComponent } from '../../core/components/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, SearchBarComponent, LoadingComponent, CommonModule, LocationPermissionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  private placesService = inject(PlacesService);

  get isUserLocationReady() {
    // console.log(this.placesService.isUserLocationReady);
    // console.log(this.placesService.userDeniedLocation);
    if (this.placesService.userDeniedLocation && !this.placesService.isUserLocationReady) {
      return true
    }

    return this.placesService.isUserLocationReady;
  }
}
