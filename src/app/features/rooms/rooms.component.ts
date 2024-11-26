import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { LocationPermissionComponent } from '@core/components/location-permission/location-permission.component';
import { PlacesService } from '@features/maps/services';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [RouterModule, LocationPermissionComponent, SearchBarComponent, LoadingComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
})
export default class RoomsComponent {
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
