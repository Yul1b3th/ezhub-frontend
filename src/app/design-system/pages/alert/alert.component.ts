import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DsAlertComponent } from '@design-system/components/ds-alert/ds-alert.component';
import { ThemeService } from '@design-system/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'alert',
  imports: [CommonModule, DsAlertComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AlertComponent {
  public readonly themeService = inject(ThemeService);
}
