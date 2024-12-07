import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { RoomsSearchComponent } from './rooms-search/rooms-search.component';
import { RoomsNavigationComponent } from './rooms-navigation/rooms-navigation.component';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RoomsSearchComponent, RoomsNavigationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {}
