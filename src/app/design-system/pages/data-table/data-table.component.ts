import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DsDataTableComponent } from '@design-system/components/ds-data-table/ds-data-table.component';
import { ThemeService } from '@design-system/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'data-table',
  imports: [CommonModule, DsDataTableComponent],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DataTableComponent {
  public readonly themeService = inject(ThemeService);
}
