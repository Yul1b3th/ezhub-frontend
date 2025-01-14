import { Component, inject } from '@angular/core';
import { DsCarouselComponent } from '@design-system/components/ds-carousel/ds-carousel.component';
import { ThemeService } from '@design-system/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'carousel',
  imports: [CommonModule, DsCarouselComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export default class CarouselComponent {
  public readonly themeService = inject(ThemeService);
}
