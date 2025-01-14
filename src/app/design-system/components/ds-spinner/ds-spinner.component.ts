import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'ds-spinner',
  imports: [CommonModule],
  templateUrl: './ds-spinner.component.html',
  styleUrls: ['./ds-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsSpinnerComponent {
  public readonly themeService = inject(ThemeService);

  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: 'primary' | 'secondary' | 'tertiary' = 'primary';
}
