import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { DsThemeSwitchComponent } from '@design-system/components/ds-theme-switch/ds-theme-switch.component';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'theme-switch',
  imports: [CommonModule, DsThemeSwitchComponent],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
})
export default class ThemeSwitchComponent {
  public readonly themeService = inject(ThemeService);
}
