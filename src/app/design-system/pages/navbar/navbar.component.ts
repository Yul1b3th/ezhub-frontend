import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export default class NavbarComponent {
  public readonly themeService = inject(ThemeService);
}
