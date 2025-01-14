import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'design-system-introduction',
  imports: [CommonModule, RouterLink],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss',
})
export default class IntroductionComponent {
  public readonly themeService = inject(ThemeService);
}
