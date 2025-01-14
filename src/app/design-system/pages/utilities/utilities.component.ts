import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'utilities',
  imports: [CommonModule],
  templateUrl: './utilities.component.html',
  styleUrl: './utilities.component.scss',
})
export default class UtilitiesComponent {
  public readonly themeService = inject(ThemeService);
}
