import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'layout',
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export default class LayoutComponent {
  public readonly themeService = inject(ThemeService);
}
