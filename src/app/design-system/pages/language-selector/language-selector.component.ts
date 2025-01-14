import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'language-selector',
  imports: [CommonModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export default class LanguageSelectorComponent {
  public readonly themeService = inject(ThemeService);
}
