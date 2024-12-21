import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@design-system/services/theme.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ds-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-card.component.html',
  styleUrls: ['./ds-card.component.scss'],
})
export class DsCardComponent {
  private themeService = inject(ThemeService);

  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() buttonText: string = 'View Details';

  get themeClass(): string {
    return this.themeService.dsTheme();
  }
}
