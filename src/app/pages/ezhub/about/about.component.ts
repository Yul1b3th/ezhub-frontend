import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapViewComponent } from '../../../maps/components/map-view/map-view.component';
import { LoadingComponent } from '../../../maps/components/loading/loading.component';
import { PlacesService } from '../../../maps/services';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MapViewComponent, LoadingComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export default class AboutComponent {
  constructor(private placesService: PlacesService) {}

  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }
}
