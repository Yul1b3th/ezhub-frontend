import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'themes',
  imports: [CommonModule],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss',
})
export default class ThemesComponent {
  public readonly themeService = inject(ThemeService);
}
