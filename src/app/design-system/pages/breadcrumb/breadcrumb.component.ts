import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DsBreadcrumbComponent } from '@design-system/components/ds-breadcrumb/ds-breadcrumb.component';
import { ThemeService } from '@design-system/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'breadcrumb',
  imports: [CommonModule, DsBreadcrumbComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BreadcrumbComponent {
  public readonly themeService = inject(ThemeService);
}
