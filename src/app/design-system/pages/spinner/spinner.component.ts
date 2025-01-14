import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DsSpinnerComponent } from '@design-system/components/ds-spinner/ds-spinner.component';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'spinner',
  imports: [CommonModule, DsSpinnerComponent],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SpinnerComponent {
  public readonly themeService = inject(ThemeService);
}
