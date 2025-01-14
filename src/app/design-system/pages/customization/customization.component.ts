import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'customization',
  imports: [CommonModule],
  templateUrl: './customization.component.html',
  styleUrl: './customization.component.scss',
})
export default class CustomizationComponent {
  public readonly themeService = inject(ThemeService);
}
