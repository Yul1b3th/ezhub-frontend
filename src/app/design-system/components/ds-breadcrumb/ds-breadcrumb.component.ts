import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';

import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'ds-breadcrumb',
  imports: [CommonModule],
  templateUrl: './ds-breadcrumb.component.html',
  styleUrls: ['./ds-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsBreadcrumbComponent {
  public readonly themeService = inject(ThemeService);

  @Input() items: { label: string; url?: string }[] = [];
}
