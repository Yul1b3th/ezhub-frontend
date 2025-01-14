import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { ThemeService } from '@design-system/services/theme.service';
import { DsButtonComponent } from '@design-system/components/ds-button/ds-button.component';

@Component({
  selector: 'ds-card',
  imports: [CommonModule, DsButtonComponent],
  templateUrl: './ds-card.component.html',
  styleUrls: ['./ds-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsCardComponent {
  public readonly themeService = inject(ThemeService);

  @Input() imageUrl?: string = '';
  @Input() title?: string = '';
  @Input() titleClass?: string = '';
  @Input() body?: string = '';
  @Input() bodyClass?: string = '';
  @Input() description?: string = '';
  @Input() descriptionClass?: string = '';
  @Input() price?: string = '';
  @Input() priceClass?: string = '';
  @Input() buttonText?: string = '';
  @Input() buttonUrl?: string = '';
  @Input() buttonTarget?: '_self' | '_blank' | '_parent' | '_top' = '_self';
  @Input() header?: string = '';
  @Input() footer?: string = '';
  @Input() ariaLabelledby?: string = '';
  @Input() ariaDescribedby?: string = '';
}
