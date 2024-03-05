import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MapService, PlacesService } from '../../maps/services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent implements OnInit {
  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    console.log(this.placesService.useLocation);
  }

  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }
}
