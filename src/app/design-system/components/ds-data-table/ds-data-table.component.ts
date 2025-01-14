import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'ds-data-table',
  imports: [CommonModule],
  templateUrl: './ds-data-table.component.html',
  styleUrls: ['./ds-data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsDataTableComponent {
  public readonly themeService = inject(ThemeService);

  @Input() columns: { header: string; field: string }[] = [];
  @Input() data: any[] = [];
}
