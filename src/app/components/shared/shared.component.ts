import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.scss',
})
export class SharedComponent {}
