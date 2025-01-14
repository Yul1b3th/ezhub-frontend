import { Component, inject } from '@angular/core';
import { DsCardSkeletonComponent } from '@design-system/components/ds-card/ds-card-skeleton/ds-card-skeleton.component';
import { ThemeService } from '@design-system/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'card-skeleton',
  imports: [CommonModule, DsCardSkeletonComponent],
  templateUrl: './card-skeleton.component.html',
  styleUrl: './card-skeleton.component.scss',
})
export default class CardSkeletonComponent {
  public readonly themeService = inject(ThemeService);
}
