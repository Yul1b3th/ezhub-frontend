import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, SearchResultsComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  private debounceTimer?: number;

  constructor(private placesService: PlacesService) {}

  onQueryChange(query: string = '') {
    if (this.debounceTimer) {
      window.clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = window.setTimeout(() => {
      console.log('query', query);
      this.placesService.getPlacesByQuery(query);
    }, 1000); // 500 ms de retardo
  }
}
