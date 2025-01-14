import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'theme-selector',
  imports: [CommonModule],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.scss',
})
export default class ThemeSelectorComponent {
  public readonly themeService = inject(ThemeService);
}
