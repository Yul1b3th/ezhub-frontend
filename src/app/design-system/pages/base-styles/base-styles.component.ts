import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'base-styles',
  imports: [CommonModule],
  templateUrl: './base-styles.component.html',
  styleUrl: './base-styles.component.scss',
})
export default class BaseStylesComponent {
  public readonly themeService = inject(ThemeService);
}
