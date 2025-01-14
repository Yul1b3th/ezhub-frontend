import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'ds-alert',
  imports: [CommonModule],
  templateUrl: './ds-alert.component.html',
  styleUrls: ['./ds-alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsAlertComponent {
  public readonly themeService = inject(ThemeService);

  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() message: string = '';
  @Input() dismissible: boolean = false;

  isVisible: boolean = true;

  dismiss(): void {
    this.isVisible = false;
  }
}
